const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rota para criar cliente
router.post('/clientes', clientesController.criarCliente);

// Rota para listar clientes
router.get('/clientes', clientesController.obterClientes);

module.exports = router;