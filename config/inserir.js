const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function main() {
  const sqlPath = path.join(__dirname, 'inserir.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('Arquivo inserir.sql não encontrado em', sqlPath);
    process.exit(1);
  }

  let sql = fs.readFileSync(sqlPath, 'utf8');

  // Remove possible Markdown code fences (```sql ... ```)
  sql = sql.replace(/^```[\s\S]*?\n/, '');
  sql = sql.replace(/\n```\s*$/m, '');

  sql = sql.trim();
  if (!sql) {
    console.error('Arquivo inserir.sql está vazio após limpeza. Nada a executar.');
    process.exit(1);
  }

  console.log('Conectando ao banco e executando inserir.sql...');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Execute whole file; Postgres aceita múltiplas instruções em um único query
    await client.query(sql);
    await client.query('COMMIT');
    console.log('Script de inserção executado com sucesso.');
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch (e) {
      /* ignore */
    }
    console.error('Erro ao executar o script SQL:', err );
    process.exitCode = 1;
  } finally {
    client.release();
    // encerra a pool para o processo terminar
    try {
      await pool.end();
    } catch (e) {
      /* ignore */
    }
  }
}

// Run when invoked directly
if (require.main === module) {
  main().catch((err) => {
    console.error('Erro inesperado:', err);
    process.exit(1);
  });
}

module.exports = { main };
