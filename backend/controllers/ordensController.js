const db = require('../config/db');

// Listar ordens
exports.listarOrdens = (req, res) => {
  db.all('SELECT * FROM ordens_de_servico', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao listar ordens' });
    } else {
      res.json(rows);
    }
  });
};

// Criar ordem de serviço
exports.criarOrdem = (req, res) => {
  const { cliente_id, descricao, status } = req.body;
  const query = `INSERT INTO ordens_de_servico (cliente_id, descricao, status) VALUES (?, ?, ?)`;
  db.run(query, [cliente_id, descricao, status], function (err) {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar ordem de serviço' });
    } else {
      res.status(201).json({ id: this.lastID, cliente_id, descricao, status });
    }
  });
};
// Atualizar ordem
exports.atualizarOrdem = (req, res) => {
  const { id } = req.params;
  const { cliente, descricao, status } = req.body;
  const query = `UPDATE ordens_de_servico SET cliente = ?, descricao = ?, status = ? WHERE id = ?`;
  db.run(query, [cliente, descricao, status, id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar ordem' });
    } else {
      res.json({ message: 'Ordem atualizada com sucesso!' });
    }
  });
};

// Deletar ordem
exports.deletarOrdem = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ordens_de_servico WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Erro ao deletar ordem' });
    } else {
      res.json({ message: 'Ordem deletada com sucesso!' });
    }
  });
};