const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const conexion = require('./config/database');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

// Rutas
const UserRoute = require('./routes/UserRoute');
const PostRoute = require('./routes/PostRoute');
const CommentRoute = require('./routes/CommentRoute');

app.use('/api', UserRoute);
app.use('/api', PostRoute);
app.use('/api', CommentRoute);

app.listen( process.env.SV_PORT || 3000, () =>{
    console.log('Escuchando el puerto '+ process.env.SV_PORT);
    conexion();
})