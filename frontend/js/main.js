document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/ordens')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#ordensTable tbody');
        tableBody.innerHTML = '';
        data.forEach(ordem => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${ordem.id}</td>
            <td>${ordem.cliente}</td>
            <td>${ordem.descricao}</td>
            <td>${ordem.status}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(err => console.error('Erro ao carregar ordens:', err));
  });
  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/ordens')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#ordensTable tbody');
        tableBody.innerHTML = '';
        data.forEach(ordem => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${ordem.id}</td>
            <td>${ordem.cliente}</td>
            <td>${ordem.descricao}</td>
            <td>${ordem.status}</td>
            <td>
              <button class="editBtn" data-id="${ordem.id}">Editar</button> | 
              <button class="deleteBtn" data-id="${ordem.id}">Deletar</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
  
        // Adicionar evento para editar ordens
        document.querySelectorAll('.editBtn').forEach(btn => {
          btn.addEventListener('click', function () {
            const ordemId = this.dataset.id;
            window.location.href = `editar.html?id=${ordemId}`;
          });
        });
  
        // Adicionar evento para deletar ordens
        document.querySelectorAll('.deleteBtn').forEach(btn => {
          btn.addEventListener('click', function () {
            const ordemId = this.dataset.id;
            if (confirm('Tem certeza de que deseja excluir esta ordem?')) {
              fetch(`http://localhost:3000/api/ordens/${ordemId}`, {
                method: 'DELETE'
              })
                .then(response => {
                  if (response.ok) {
                    alert('Ordem deletada com sucesso!');
                    window.location.reload(); // Recarrega a página para refletir a mudança
                  } else {
                    alert('Erro ao deletar ordem.');
                  }
                })
                .catch(error => console.error('Erro:', error));
            }
          });
        });
      })
      .catch(err => console.error('Erro ao carregar ordens:', err));
  });