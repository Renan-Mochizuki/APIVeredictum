// Verifica se houve erro de violação de constraint do usuário
function constraintUser(error) {
  // Verifica se é erro de violação de constraint unique
  if (error.code === '23505') {
    if (error.constraint?.includes('email')) {
      return { status: 409, message: 'Email já está em uso' };
    } else if (error.constraint?.includes('apelido')) {
      return { status: 409, message: 'Esse nome já está em uso' };
    }
    return { status: 409, message: 'Email ou nome já em uso' };
  }
  return null;
}

function constraintUnique(error, tipo = 'insert') {
  // Verifica se é erro de violação de constraint unique
  if (error.code === '23505') {
    return { status: 409, message: 'Valor já em uso' };
  }
  // Verifica se é erro de violação de constraint foreign_key
  if (error.code === '23503') {
    if (tipo === 'delete') {
      return { status: 409, message: 'Não é possível deletar, existem registros dependentes' };
    }
    return { status: 404, message: 'Valor de chave não encontrado' };
  }

  return null;
}

module.exports = {
  constraintUser,
  constraintUnique
};