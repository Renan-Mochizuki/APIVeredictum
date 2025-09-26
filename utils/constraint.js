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

module.exports = {
  constraintUser
};