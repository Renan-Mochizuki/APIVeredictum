function constraints(error, tipo = 'insert') {
  switch (error.code) {
    // Verifica se é erro de violação de constraint unique
    case '23505':
      return { status: 409, message: 'Valor já em uso' };
    // Verifica se é erro de violação de constraint foreign_key
    case '23503':
      if (tipo === 'delete') {
        return { status: 409, message: 'Não é possível deletar, existem registros dependentes' };
      }
      return { status: 404, message: 'Valor de chave não encontrado' };
    // Verifica se é erro de violação de constraint not_null
    case '23502':
      return { status: 400, message: 'Campo obrigatório não foi fornecido' };
  }

  return null;
}

// Verifica se houve erro de violação de constraint do usuário
function constraintUser(error, tipo = 'insert') {
  // Verifica se é erro de violação de constraint unique
  if (error.code === '23505') {
    if (error.constraint?.includes('email')) {
      return { status: 409, message: 'Email já está em uso' };
    } else if (error.constraint?.includes('apelido')) {
      return { status: 409, message: 'Esse nome já está em uso' };
    }
    return { status: 409, message: 'Email ou nome já em uso' };
  }
  return constraints(error, tipo);
}

module.exports = {
  constraintUser,
  constraints,
};