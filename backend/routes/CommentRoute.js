const express = require('express');
const router = express.Router();

const { anadirComentario, eliminarComentario } = require('../controllers/CommentController');

router.post('/comment', anadirComentario);
router.delete('/comment', eliminarComentario);