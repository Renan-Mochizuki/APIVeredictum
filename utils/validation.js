// Verifica se os campos obrigatórios estão presentes e não estão vazios
function validateRequiredFields(body, requiredFields) {
  const errors = [];

  // Percorre todos os campos obrigatórios e insere mensagem de erro para cada um faltante
  requiredFields.forEach((field) => {
    if (!body[field] || body[field].toString().trim() === '') {
      errors.push(`Campo '${field}' é obrigatório`);
    }
  });

  // isValid será true se não houver erros
  return {
    isValid: errors.length === 0,
    errors,
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
    errors,
  };
}

// Validação genérica baseada em regras definidas
// Regras possíveis: required, minLength, maxLength, pattern (regex), custom (função)
function validateData(data, rules) {
  const errors = [];

  Object.keys(rules).forEach((field) => {
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

      // Tipo de dado
      if (rule.type) {
        if (rule.type === 'number') {
          const num = Number(value);
          if (Number.isNaN(num)) {
            errors.push(`Campo '${field}' deve ser um número`);
          }
        }

        if (rule.type === 'string') {
          if ((typeof value === 'number' && !isNaN(value)) || /^[-+]?\d*\.?\d+$/.test(value.toString().trim())) {
            errors.push(`Campo '${field}' deve ser uma string`);
          }
        }

        if (rule.type === 'date') {
          const parsed = value instanceof Date ? value.getTime() : Date.parse(value.toString().trim());
          if (Number.isNaN(parsed)) {
            errors.push(`Campo '${field}' deve ser uma data válida`);
          }

          const date = new Date(parsed);

          if (!rule.minDate) {
            rule.minDate = new Date('1895-01-01');
          }

          const minParsed = rule.minDate instanceof Date ? rule.minDate.getTime() : Date.parse(rule.minDate);
          if (!Number.isNaN(minParsed)) {
            const minDate = new Date(minParsed);
            if (date.getTime() < minDate.getTime()) {
              errors.push(rule.minDateMessage || `Campo '${field}' não está em um intervalo permitido`);
            }
          }

          if (rule.maxDate) {
            const maxParsed = rule.maxDate instanceof Date ? rule.maxDate.getTime() : Date.parse(rule.maxDate);
            if (!Number.isNaN(maxParsed)) {
              const maxDate = new Date(maxParsed);
              if (date.getTime() > maxDate.getTime()) {
                errors.push(rule.maxDateMessage || `Campo '${field}' não está em um intervalo permitido`);

              }
            }
          }
        }
      }

      // Comprimento mínimo
      if (rule.minLength && fieldValue.length < rule.minLength) {
        errors.push(`Campo '${field}' deve ter pelo menos ${rule.minLength} caracteres`);
      }

      // Comprimento máximo
      if (rule.maxLength && fieldValue.length > rule.maxLength) {
        errors.push(`Campo '${field}' deve ter no máximo ${rule.maxLength} caracteres`);
      }

      if (rule.minValue && Number(value) < rule.minValue) {
        errors.push(`Campo '${field}' deve ser no mínimo ${rule.minValue}`);
      }

      if (rule.maxValue && Number(value) > rule.maxValue) {
        errors.push(`Campo '${field}' deve ser no máximo ${rule.maxValue}`);
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
    errors,
  };
}

module.exports = {
  validateRequiredFields,
  validateUserData,
  validateData,
};
