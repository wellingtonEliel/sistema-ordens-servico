const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.resolve(__dirname, 'ordens_de_servico.db');

// Conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

// Criar as tabelas se não existirem
db.serialize(() => {
  // Tabela de ordens de serviço
  db.run(`
    CREATE TABLE IF NOT EXISTS ordens_de_servico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      descricao TEXT NOT NULL,
      status TEXT CHECK(status IN ('Aberta', 'Em Andamento', 'Concluída')) NOT NULL DEFAULT 'Aberta',
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    )
  `);

  // Tabela de clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      telefone TEXT,
      email TEXT
    )
  `);
});

module.exports = db;