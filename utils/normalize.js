// Normaliza e formata dados
function normalizeData(data) {
  let { apelido, email } = data;
  if (apelido) {
    apelido = apelido.trim();
  }
  if (email) {
    email = email.toLowerCase().trim();
  }

  return { apelido, email };
}

module.exports = { normalizeData };
