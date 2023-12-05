const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../controllers/UserController'); // Destructuracion de las funciones, del objeto exportado con los controladores

router.post('/signup', signUp);
router.post('/signin', signIn)

module.exports = router;