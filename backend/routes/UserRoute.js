const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/UserController'); // Destructuracion de las funciones, del objeto exportado con los controladores

router.post('/user/create', signup);

module.exports = router;