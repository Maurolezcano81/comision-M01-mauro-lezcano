const UserModel = require ('../models/UserModel');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


function encriptarContrasena(contrasena){
    const contrasenaEncriptada = bcrypt.hash(contrasena, 10, ( err, res ) =>{
        if(err){
            res.status(400).json({
                message: err.message
            });
        }

        res.status(200).json({
            message: 'Contrasena encriptada'
        });
    })

    return contrasenaEncriptada;
}

const signup = async (req, res) =>{
    const { username, password, email, avatarUrl } = req.body;

    const consultarUsuarioExistente = await UserModel.findOne({
        username: username
    })

    if(consultarUsuarioExistente){
        res.status(403).json({
            message: 'Este nombre de usuario ya esta registrado'
        })
    }

    const consultarCorreoExistente = await UserModel.findOne({
        email: email
    })

    if(consultarCorreoExistente){
        res.status(403).json({
            message: 'Este correo electronico ya esta registrado'
        })


    const contrasenaEncriptada = encriptarContrasena(password);


    try{
        const usuarioRegistrado = UserModel.create({
            username: username,
            password: contrasenaEncriptada,
            email: consultarCorreoExistente,
            avatarUrl: avatarUrl,
        })

        res.status(201).json({
            message: 'Usuario creado con exito',
            usuarioRegistrado
        })

    } catch(error){
        console.error(error.message);
    }

    }
}


module.exports = {
    signup
}