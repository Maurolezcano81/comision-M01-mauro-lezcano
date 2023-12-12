const express = require('express');
const router = express.Router();
const { crearPost, mostrarPosts, eliminarPost } = require('../controllers/PostController')
// const { verificarToken } = require('../middlewares/verificarLoggin');

router.post('/post', crearPost);
router.get('/posts', mostrarPosts);
router.delete('/post/:id', eliminarPost);


module.exports = router;