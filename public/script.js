document.addEventListener('click', (e) => {
  const button = e.target;

  // GET requests (buscar por ID)
  if (button.hasAttribute('data-route') && button.getAttribute('data-method') === 'get') {
    e.preventDefault();

    const route = button.getAttribute('data-route');
    const inputName = button.getAttribute('data-input');
    const input = document.querySelector(`input[data-input="${inputName}"]`);

    if (input) {
      const value = input.value.trim();
      if (value) {
        // Redireciona para a URL com o ID
        window.location.href = route + '/' + value;
      }
    }
  }

  // POST requests
  if (button.hasAttribute('data-route') && button.getAttribute('data-method') === 'post') {
    e.preventDefault();

    const route = button.getAttribute('data-route');
    const fieldsString = button.getAttribute('data-fields');
    const fields = fieldsString.split(',');

    // Encontra a área de resposta dentro do mesmo .buttons (pode estar em outra subbox)
    const responseArea = button.closest && button.closest('.buttons') ? button.closest('.buttons').querySelector('.responseArea') : button.parentElement.querySelector('.responseArea');

    // Coleta dados dos campos
    const data = {};
    const container = button.parentElement;

    fields.forEach((field) => {
      const input = container.querySelector(`input[data-field="${field}"]`);
      if (input) {
        data[field] = input.value;
      }
    });

    // Faz a requisição POST
    makeRequest('POST', route, data, responseArea);
  }

  // PUT requests
  if (button.hasAttribute('data-route') && button.getAttribute('data-method') === 'put') {
    e.preventDefault();

    const route = button.getAttribute('data-route');
    const fieldsString = button.getAttribute('data-fields');
    const fields = fieldsString.split(',');

    // Encontra a área de resposta dentro do mesmo .buttons (pode estar em outra subbox)
    const responseArea = button.closest && button.closest('.buttons') ? button.closest('.buttons').querySelector('.responseArea') : button.parentElement.querySelector('.responseArea');

    // Coleta dados dos campos
    const data = {};
    const container = button.parentElement;
    let id = null;

    // Coleta o ID separadamente
    const idInput = container.querySelector(`input[data-field="id"]`);
    if (idInput) {
      id = idInput.value.trim();
    }

    // Coleta os outros campos
    fields.forEach((field) => {
      const input = container.querySelector(`input[data-field="${field}"]`);
      if (input && input.value.trim()) {
        data[field] = input.value;
      }
    });

    // Verifica se o ID foi fornecido
    if (!id) {
      if (responseArea) {
        responseArea.textContent = 'Erro: ID é obrigatório para alterar';
      }
      return;
    }

    // Faz a requisição PUT com o ID na URL
    makeRequest('PUT', `${route}/${id}`, data, responseArea);
  }

  // DELETE requests
  if (button.hasAttribute('data-route') && button.getAttribute('data-method') === 'delete') {
    e.preventDefault();

    const route = button.getAttribute('data-route');
    // Encontra a área de resposta dentro do mesmo .buttons (pode estar em outra subbox)
    const responseArea = button.closest && button.closest('.buttons') ? button.closest('.buttons').querySelector('.responseArea') : button.parentElement.querySelector('.responseArea');
    const container = button.parentElement;
    let id = null;

    // Coleta o ID
    const idInput = container.querySelector(`input[data-field="id"]`);
    if (idInput) {
      id = idInput.value.trim();
    }

    // Verifica se o ID foi fornecido
    if (!id) {
      if (responseArea) {
        responseArea.textContent = 'Erro: ID é obrigatório para excluir';
      }
      return;
    }

    makeRequest('DELETE', `${route}/${id}`, null, responseArea);
  }
});

// Função genérica para fazer requisições HTTP
async function makeRequest(method, route, data, responseArea) {
  try {
    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Só adiciona body se houver dados (DELETE não precisa de body)
    if (data && Object.keys(data).length > 0) {
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(route, requestOptions);

    const result = await response.text();

    // Tenta parsear como JSON para formatação
    if (responseArea) {
      try {
        const jsonData = JSON.parse(result);
        responseArea.textContent = JSON.stringify(jsonData, null, 2);
      } catch (e) {
        responseArea.textContent = result;
      }
    }
  } catch (error) {
    if (responseArea) {
      responseArea.textContent = `Erro: ${error.message}`;
    }
  }
}
