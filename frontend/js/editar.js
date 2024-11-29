// Pegando o ID da ordem da URL
const urlParams = new URLSearchParams(window.location.search);
const ordemId = urlParams.get('id');

// Preencher o formulário com os dados da ordem
fetch(`http://localhost:3000/api/ordens/${ordemId}`)
  .then(response => response.json())
  .then(ordem => {
    document.getElementById('ordemId').value = ordem.id;
    document.getElementById('cliente').value = ordem.cliente;
    document.getElementById('descricao').value = ordem.descricao;
    document.getElementById('status').value = ordem.status;
  })
  .catch(err => console.error('Erro ao buscar ordem:', err));

// Enviar o formulário de edição
document.getElementById('editarForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const cliente = document.getElementById('cliente').value;
  const descricao = document.getElementById('descricao').value;
  const status = document.getElementById('status').value;

  fetch(`http://localhost:3000/api/ordens/${ordemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cliente, descricao, status }),
  })
    .then(response => {
      if (response.ok) {
        alert('Ordem atualizada com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a página inicial
      } else {
        alert('Erro ao atualizar ordem.');
      }
    })
    .catch(error => console.error('Erro:', error));
});