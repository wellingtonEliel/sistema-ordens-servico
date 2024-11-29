const express = require('express');
const router = express.Router();
const ordensController = require('../controllers/ordensController');

// Rotas CRUD
router.get('/', ordensController.listarOrdens);
router.post('/', ordensController.criarOrdem);
// Rota para obter uma ordem específica
router.get('/ordens/:id', ordensController.getOrdem);
// Rota para atualizar uma ordem
router.put('/ordens/:id', ordensController.atualizarOrdem);
// Rota para deletar uma ordem
router.delete('/ordens/:id', ordensController.deletarOrdem);

module.exports = router;

module.exports = router;