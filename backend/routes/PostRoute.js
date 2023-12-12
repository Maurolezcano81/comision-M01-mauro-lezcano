const express = require('express');
const router = express.Router();
const { crearPost } = require('../controllers/PostController')
// const { verificarToken } = require('../middlewares/verificarLoggin');

router.post('/post', crearPost);

module.exports = router;