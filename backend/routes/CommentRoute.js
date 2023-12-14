const express = require('express');
const router = express.Router();

const { anadirComentario, eliminarComentario } = require('../controllers/CommentController');

router.put('/post/comment/:id', anadirComentario);
router.delete('/comment/:id', eliminarComentario);

module.exports = router;