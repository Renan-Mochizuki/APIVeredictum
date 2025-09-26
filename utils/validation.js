// Verifica se os campos obrigatórios estão presentes e não estão vazios
function validateRequiredFields(body, requiredFields) {
  const errors = [];
  
  // Percorre todos os campos obrigatórios e insere mensagem de erro para cada um faltante
  requiredFields.forEach(field => {
    if (!body[field] || body[field].toString().trim() === '') {
      errors.push(`Campo '${field}' é obrigatório`);
    }
  });
  
  // isValid será true se não houver erros
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Verifica se os dados de apelido, email e senha são válidos
function validateUserData(userData) {
  const { apelido, email, senha } = userData;
  const errors = [];

  // Validação do apelido
  if (apelido) {
    if (apelido.length < 3 || apelido.length > 30) {
      errors.push('Apelido deve ter entre 3 e 30 caracteres');
    }
  } else {
    errors.push('Informe um apelido');
  }

  // Validação da senha
  if (senha) {
    if (senha.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }
    if (!/\d/.test(senha)) {
      errors.push('Senha deve conter pelo menos um número');
    }
    if (!/[a-zA-Z]/.test(senha)) {
      errors.push('Senha deve conter pelo menos uma letra');
    }
  } else {
    errors.push('Informe uma senha');
  }

  // Validação do email
  if (email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Email possui formato inválido');
    }
  } else {
    errors.push('Informe um email');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validação genérica baseada em regras definidas
// Regras possíveis: required, minLength, maxLength, pattern (regex), custom (função)
function validateData(data, rules) {
  const errors = [];

  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];

    // Se o campo for required e estiver ausente ou vazio, adiciona erro
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors.push(`Campo '${field}' é obrigatório`);
    }
    // Se o campo não é obrigatório e está vazio, pula as outras validações
    else if (!value || value.toString().trim() === '') {
      return; // continue
    }
    // Outras validações
    else {
      const fieldValue = value.toString().trim();

      // Comprimento mínimo
      if (rule.minLength && fieldValue.length < rule.minLength) {
        errors.push(`Campo '${field}' deve ter pelo menos ${rule.minLength} caracteres`);
      }

      // Comprimento máximo
      if (rule.maxLength && fieldValue.length > rule.maxLength) {
        errors.push(`Campo '${field}' deve ter no máximo ${rule.maxLength} caracteres`);
      }

      // Regex personalizado
      if (rule.pattern && !rule.pattern.test(fieldValue)) {
        errors.push(rule.patternMessage || `Campo '${field}' possui formato inválido`);
      }

      // Função de validação customizada
      if (rule.custom && typeof rule.custom === 'function') {
        const customResult = rule.custom(fieldValue);
        if (customResult !== true) {
          errors.push(customResult || `Campo '${field}' é inválido`);
        }
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateRequiredFields,
  validateUserData,
  validateData
};