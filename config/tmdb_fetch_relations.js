require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const TMDB_KEY = process.env.TMDB_API_KEY;
if (!TMDB_KEY) {
  console.error('Missing TMDB_API_KEY in environment. Set it and re-run.');
  process.exit(1);
}

function normalizeText(s) {
  return (s || '')
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

const countryCodeMap = {
  US: 'Estados Unidos',
  GB: 'Reino Unido',
  KR: 'Coreia do Sul',
  JP: 'Japão',
  FR: 'França',
  CA: 'Canadá',
  BR: 'Brasil',
  DE: 'Alemanha',
  IT: 'Itália',
  ES: 'Espanha',
  MX: 'México',
  CN: 'China',
  IN: 'Índia',
  AU: 'Austrália',
  NZ: 'Nova Zelândia',
  RU: 'Rússia',
  SE: 'Suécia',
  NO: 'Noruega',
  DK: 'Dinamarca',
  FI: 'Finlândia',
  NL: 'Holanda',
  BE: 'Bélgica',
  CH: 'Suíça',
  ZA: 'África do Sul',
  TR: 'Turquia',
  EG: 'Egito',
  AR: 'Argentina',
  CL: 'Chile',
  CO: 'Colômbia',
  PE: 'Peru',
  VE: 'Venezuela',
  PL: 'Polônia',
  HU: 'Hungria',
  CZ: 'República Tcheca',
  GR: 'Grécia',
  PT: 'Portugal',
};

const genreMap = {
  'Science Fiction': 'Ficção Científica',
  'Sci-Fi & Fantasy': 'Ficção Científica',
  Thriller: 'Thriller',
  Crime: 'Crime',
  Drama: 'Drama',
  Mystery: 'Mistério',
  Action: 'Ação',
  Comedy: 'Comédia',
  Adventure: 'Aventura',
  Documentary: 'Documentário',
  Animation: 'Animação',
  Romance: 'Romance',
  Horror: 'Terror',
  Music: 'Musical',
  History: 'Histórico',
  Family: 'Infantil',
  War: 'Guerra',
  Western: 'Faroeste',
  Fantasy: 'Fantasia',
};

async function searchTMDB(title, isTVFirst = true) {
  const q = encodeURIComponent(title);
  try {
    if (isTVFirst) {
      let res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_KEY}&query=${q}&language=en-US`);
      if (res.data && res.data.results && res.data.results.length) return { type: 'tv', id: res.data.results[0].id };
      res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${q}&language=en-US`);
      if (res.data && res.data.results && res.data.results.length) return { type: 'movie', id: res.data.results[0].id };
    } else {
      let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${q}&language=en-US`);
      if (res.data && res.data.results && res.data.results.length) return { type: 'movie', id: res.data.results[0].id };
      res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_KEY}&query=${q}&language=en-US`);
      if (res.data && res.data.results && res.data.results.length) return { type: 'tv', id: res.data.results[0].id };
    }
  } catch (err) {
    console.warn('TMDB search error for', title, err.message);
  }
  return null;
}

async function getDetails(tm) {
  try {
    if (tm.type === 'movie') {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${tm.id}?api_key=${TMDB_KEY}&language=en-US`);
      return res.data;
    } else {
      const res = await axios.get(`https://api.themoviedb.org/3/tv/${tm.id}?api_key=${TMDB_KEY}&language=en-US`);
      return res.data;
    }
  } catch (err) {
    console.warn('TMDB details error', err.message);
    return null;
  }
}

async function main() {
  const client = await db.connect();
  try {
    const obrasRes = await client.query('SELECT obraId, obraTitulo, obraDescricao, obraTipoObraNome FROM Obra ORDER BY obraId');
    // normalize row keys to be robust against pg lowercasing
    const obras = obrasRes.rows.map((r) => ({
      obraId: r.obraid ?? r.obraId ?? r.obra_id ?? r.id,
      obraTitulo: r.obratitulo ?? r.obraTitulo ?? r.title ?? r.obra_titulo ?? '',
      obraDescricao: r.obradescricao ?? r.obraDescricao ?? r.description ?? r.obra_descricao ?? '',
      obraTipoObraNome: r.obratipoobranome ?? r.obraTipoObraNome ?? r.obra_tipoobra_nome ?? r.obra_tipoobra_nome ?? '',
    }));

    const categoriasRes = await client.query('SELECT cateNome FROM Categoria');
    const categorias = categoriasRes.rows.map((r) => r.catenome ?? r.cateNome ?? Object.values(r)[0]);
    const paisesRes = await client.query('SELECT paisNome FROM PaisOrigem');
    const paises = paisesRes.rows.map((r) => r.paisnome ?? r.paisNome ?? Object.values(r)[0]);

    console.log(`Found ${obras.length} obras, ${categorias.length} categorias, ${paises.length} paises in DB`);

    const existingCatsNormalized = new Set(categorias.map(normalizeText));
    const existingPaisesNormalized = new Set(paises.map(normalizeText));

    const inserts = [];
    const ensureCategoria = new Set();
    const ensurePais = new Set();

    for (const obra of obras) {
      const title = obra.obraTitulo;
      const descr = obra.obraDescricao || '';
      if (!title) continue;

      process.stdout.write(`Processing obraId=${obra.obraId} title="${title}"... `);

      const tm = await searchTMDB(title, true);
      if (!tm) {
        process.stdout.write('no TMDB match\n');
        const descNorm = normalizeText(descr);
        for (const cat of categorias) {
          if (descNorm.includes(normalizeText(cat))) {
            inserts.push({ tipo: 'categoria', obraId: obra.obraId, value: cat });
          }
        }
        continue;
      }

      const details = await getDetails(tm);
      if (!details) {
        process.stdout.write('no details\n');
        continue;
      }

      const prodCountries = details.production_countries || [];
      const mappedCountries = new Set();
      for (const c of prodCountries) {
        const code = (c.iso_3166_1 || '').toUpperCase();
        let mapped = countryCodeMap[code];
        if (!mapped) {
          const candidate = normalizeText(c.name || '');
          for (const p of paises) {
            if (normalizeText(p) === candidate) {
              mapped = p;
              break;
            }
          }
        }
        if (mapped) mappedCountries.add(mapped);
        else if (c.name) mappedCountries.add(c.name);
      }

      const genres = details.genres || [];
      const mappedGenres = new Set();
      for (const g of genres) {
        const name = g.name;
        let mapped = genreMap[name];
        if (!mapped) {
          const cand = normalizeText(name);
          for (const p of categorias) {
            if (normalizeText(p) === cand) {
              mapped = p;
              break;
            }
          }
        }
        if (mapped) mappedGenres.add(mapped);
        else if (name) mappedGenres.add(name);
      }

      if (mappedGenres.size === 0 && descr) {
        const dnorm = normalizeText(descr);
        for (const cat of categorias) {
          if (dnorm.includes(normalizeText(cat))) mappedGenres.add(cat);
        }
      }

      for (const pc of Array.from(mappedCountries)) {
        if (!pc) continue;
        if (!existingPaisesNormalized.has(normalizeText(pc))) ensurePais.add(pc);
        inserts.push({ tipo: 'pais', obraId: obra.obraId, value: pc });
      }

      for (const cg of Array.from(mappedGenres)) {
        if (!cg) continue;
        if (!existingCatsNormalized.has(normalizeText(cg))) ensureCategoria.add(cg);
        inserts.push({ tipo: 'categoria', obraId: obra.obraId, value: cg });
      }

      process.stdout.write(`countries:${mappedCountries.size} genres:${mappedGenres.size}\n`);
    }

    const outLines = [];
    outLines.push('-- Generated by config/tmdb_fetch_relations.js');
    outLines.push('-- Review before applying to DB');
    outLines.push('BEGIN;');

    for (const p of ensurePais) {
      const pname = p.replace(/'/g, "''");
      outLines.push(`INSERT INTO PaisOrigem (paisNome) VALUES ('${pname}') ON CONFLICT DO NOTHING;`);
    }

    for (const c of ensureCategoria) {
      const cname = c.replace(/'/g, "''");
      outLines.push(`INSERT INTO Categoria (cateNome) VALUES ('${cname}') ON CONFLICT DO NOTHING;`);
    }

    for (const it of inserts) {
      const val = it.value.replace(/'/g, "''");
      if (it.tipo === 'pais') {
        outLines.push(
          `INSERT INTO Obra_PaisOrigem (obraId, paisOrigemId) SELECT ${it.obraId}, '${val}' WHERE NOT EXISTS (SELECT 1 FROM Obra_PaisOrigem WHERE obraId=${it.obraId} AND paisOrigemId='${val}');`
        );
      } else if (it.tipo === 'categoria') {
        outLines.push(
          `INSERT INTO Obra_Categoria (obraId, categoriaId) SELECT ${it.obraId}, '${val}' WHERE NOT EXISTS (SELECT 1 FROM Obra_Categoria WHERE obraId=${it.obraId} AND categoriaId='${val}');`
        );
      }
    }

    outLines.push('COMMIT;');

    const outPath = path.join(__dirname, 'obra_relations_inserts.sql');
    fs.writeFileSync(outPath, outLines.join('\n'));
    console.log('Wrote', outPath, `with ${inserts.length} relation inserts, ${ensurePais.size} new pais entries, ${ensureCategoria.size} new categoria entries.`);
  } catch (err) {
    console.error('Fatal error', err);
  } finally {
    client.release();
    db.end && db.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
