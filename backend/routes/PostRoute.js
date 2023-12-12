const express = require('express');
const router = express.Router();
const { crearPost, mostrarPosts, eliminarPost, editarPost, mostrarPost } = require('../controllers/PostController')
// const { verificarToken } = require('../middlewares/verificarLoggin');

router.post('/post', crearPost);
router.get('/posts', mostrarPosts);
router.delete('/post/:id', eliminarPost);
router.put('/post/:id', editarPost);
router.get('/post/:id', mostrarPost)


module.exports = router;