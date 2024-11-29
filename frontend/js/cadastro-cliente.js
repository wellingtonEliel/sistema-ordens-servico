document.getElementById('formCadastroCliente').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar o envio do formulário
  
    // Coletar os dados do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
  
    // Enviar os dados para o servidor via API
    fetch('http://localhost:3000/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Cliente cadastrado com sucesso!');
          // Limpar o formulário
          document.getElementById('formCadastroCliente').reset();
        } else {
          alert('Erro ao cadastrar cliente.');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao se comunicar com o servidor.');
      });
  });