document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário
  
    const cliente = document.getElementById('cliente').value;
    const descricao = document.getElementById('descricao').value;
    const status = document.getElementById('status').value;
  
    // Envia os dados para a API
    fetch('http://localhost:3000/api/ordens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cliente, descricao, status }),
    })
      .then(response => {
        if (response.ok) {
          alert('Ordem cadastrada com sucesso!');
          window.location.href = 'index.html'; // Redireciona para a página inicial
        } else {
          alert('Erro ao cadastrar ordem. Tente novamente.');
        }
      })
      .catch(error => console.error('Erro:', error));
  });
  document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/clientes')
      .then(response => response.json())
      .then(clientes => {
        const clienteSelect = document.getElementById('cliente_id');
        clientes.forEach(cliente => {
          const option = document.createElement('option');
          option.value = cliente.id;
          option.textContent = `${cliente.nome} - ${cliente.cpf}`;
          clienteSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Erro ao carregar clientes:', error));
  });