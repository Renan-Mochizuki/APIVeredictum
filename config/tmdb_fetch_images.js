const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const TMDB_KEY = process.env.TMDB_API_KEY;
const LANGUAGE = process.env.TMDB_LANGUAGE || 'en-US';
const INPUT_SQL = path.join(__dirname, 'inserir.sql');
const OUTPUT_SQL = path.join(__dirname, 'obra_image_updates.sql');

if (!TMDB_KEY) {
  console.error('Por favor defina a variável de ambiente TMDB_API_KEY com sua chave do TMDB.');
  console.error('Ex: setx TMDB_API_KEY "sua_chave" (Windows) ou export TMDB_API_KEY=sua_chave');
  process.exit(1);
}

function splitTuple(tuple) {
  const cols = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < tuple.length; i++) {
    const ch = tuple[i];
    if (ch === "'") {
      // handle doubled single quote as escape inside SQL
      if (inQuote && tuple[i + 1] === "'") {
        cur += "'"; // add one quote
        i++; // skip the escaped one
        continue;
      }
      inQuote = !inQuote;
      cur += ch;
      continue;
    }
    if (ch === ',' && !inQuote) {
      cols.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.length) cols.push(cur.trim());
  return cols.map((c) => c.replace(/^\(|\)$/g, '').trim());
}

function unquote(sqlStr) {
  if (!sqlStr) return null;
  sqlStr = sqlStr.trim();
  if (sqlStr.toUpperCase() === 'NULL') return null;
  if (sqlStr[0] === "'" && sqlStr[sqlStr.length - 1] === "'") {
    // remove surrounding quotes and unescape doubled single-quotes
    return sqlStr.slice(1, -1).replace(/''/g, "'");
  }
  return sqlStr;
}

async function searchTmdb(title, type) {
  const encoded = encodeURIComponent(title);
  try {
    if (type === 'Série' || type === 'Serie' || type === 'Series' || type === 'TV') {
      const resTv = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
        params: { api_key: TMDB_KEY, query: title, language: LANGUAGE, page: 1 },
      });
      const tvs = resTv.data && resTv.data.results ? resTv.data.results : [];
      if (tvs.length && (tvs[0].poster_path || tvs[0].backdrop_path)) return tvs[0].poster_path || tvs[0].backdrop_path;
      // fallback to movie search
    }

    // movie search
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: { api_key: TMDB_KEY, query: title, language: LANGUAGE, page: 1 },
    });
    const results = res.data && res.data.results ? res.data.results : [];
    if (results.length && (results[0].poster_path || results[0].backdrop_path)) return results[0].poster_path || results[0].backdrop_path;
    return null;
  } catch (err) {
    console.error('Erro ao consultar TMDB para', title, err && err.message ? err.message : err);
    return null;
  }
}

async function main() {
  if (!fs.existsSync(INPUT_SQL)) {
    console.error('Arquivo inserir.sql não encontrado em', INPUT_SQL);
    process.exit(1);
  }

  const content = fs.readFileSync(INPUT_SQL, 'utf8');

  // find all INSERT INTO Obra ... VALUES ... ; blocks
  const inserts = [];
  const insertRegex = /INSERT INTO Obra[\s\S]*?VALUES[\s\S]*?;/gi;
  let m;
  while ((m = insertRegex.exec(content)) !== null) {
    inserts.push(m[0]);
  }

  if (!inserts.length) {
    console.error('Nenhum INSERT INTO Obra encontrado em inserir.sql');
    process.exit(1);
  }

  const titles = [];
  for (const block of inserts) {
    // extract the parenthesized tuples after VALUES
    const valuesPart = block.substring(block.toUpperCase().indexOf('VALUES') + 6).trim();
    // remove trailing semicolon if present
    const trimmed = valuesPart.replace(/;\s*$/, '');
    // split tuples by '),\n(' or '), (' safely
    // normalize start and end
    let tuples = trimmed;
    // remove leading and trailing parentheses wrap if there's only one tuple
    // split on pattern: ),\s*\(
    const parts = tuples.split(/\),\s*\(/);
    for (let i = 0; i < parts.length; i++) {
      let p = parts[i];
      if (i === 0) p = p.replace(/^\s*\(/, '');
      if (i === parts.length - 1) p = p.replace(/\)\s*$/, '');
      const cols = splitTuple(p);
      const tituloRaw = cols[0];
      const tipoRaw = cols[2] || null;
      const titulo = unquote(tituloRaw);
      const tipo = unquote(tipoRaw);
      if (titulo) titles.push({ titulo, tipo });
    }
  }

  console.log(`Encontradas ${titles.length} obras. Consultando TMDB (isso pode demorar)...`);

  const mapping = [];
  for (let i = 0; i < titles.length; i++) {
    const item = titles[i];
    process.stdout.write(`(${i + 1}/${titles.length}) ${item.titulo} ... `);
    const posterPath = await searchTmdb(item.titulo, item.tipo);
    if (posterPath) {
      const url = `https://image.tmdb.org/t/p/w500${posterPath}`;
      mapping.push({ titulo: item.titulo, url });
      console.log('OK');
    } else {
      mapping.push({ titulo: item.titulo, url: null });
      console.log('NÃO ENCONTRADO');
    }
    // pequeno delay para evitar rate limits
    await new Promise((r) => setTimeout(r, 250));
  }

  // Generate update SQL
  const lines = [];
  lines.push('-- Updates gerados pelo tmdb_fetch_images.js');
  lines.push('-- Execute este arquivo após as tabelas existirem para atualizar obraImgUrl');
  for (const mapp of mapping) {
    if (mapp.url) {
      const titleEsc = mapp.titulo.replace(/'/g, "''");
      const urlEsc = mapp.url.replace(/'/g, "''");
      lines.push(`UPDATE Obra SET obraImgUrl = '${urlEsc}' WHERE obraTitulo = '${titleEsc}';`);
    }
  }

  fs.writeFileSync(OUTPUT_SQL, lines.join('\n') + '\n', 'utf8');
  console.log('Arquivo gerado:', OUTPUT_SQL);
  const notFound = mapping.filter((m) => !m.url).map((m) => m.titulo);
  if (notFound.length) {
    console.log('Não encontrados no TMDB (você pode ajustar manualmente):', notFound.join(', '));
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Erro inesperado:', err);
    process.exit(1);
  });
}
