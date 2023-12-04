const mongoose = require('mongoose');

const conectarDB = async () =>{
    await mongoose.connect(`${process.env.MONGO_URI}`)
    .then( () =>{
        console.log(`Conectado a la base de datos: ${mongoose.connection.name}`);
    })
    .catch( (err) => {
        console.error(err);
    });
}

module.exports = conectarDB;