const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const conexion = require('./config/database');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
dotenv.config();


// Rutas
const UserRoute = require('./routes/UserRoute');

app.use('/api', UserRoute);

app.listen( process.env.SV_PORT || 3000, () =>{
    console.log('Escuchando el puerto '+ process.env.SV_PORT);
    conexion();
})