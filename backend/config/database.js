const mongoose = require('mongoose');

const conectarDB = async () =>{
    await mongosee.connect(`${process.env.MONGO_URI}`);
}