const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Importa a conexão com o banco de dados

const app = express();
const port = 3000;

app.use(bodyParser.json()); // Para lidar com JSON no corpo da requisição

// Rota para cadastrar cliente
app.post('/api/clientes', (req, res) => {
  const { nome, cpf, telefone, email } = req.body;

  // Verificar se os campos obrigatórios estão presentes
  if (!nome || !cpf) {
    return res.status(400).json({ success: false, message: 'Nome e CPF são obrigatórios.' });
  }

  const query = `
    INSERT INTO clientes (nome, cpf, telefone, email)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [nome, cpf, telefone, email], function (err) {
    if (err) {
      console.error('Erro ao cadastrar cliente:', err.message);
      return res.status(500).json({ success: false, message: 'Erro ao cadastrar cliente.' });
    }

    res.status(201).json({ success: true, id: this.lastID });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});