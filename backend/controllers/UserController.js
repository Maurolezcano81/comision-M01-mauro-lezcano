const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const encriptarContrasena = async (password) => {
    try {
        const contrasenaEncriptada = await bcrypt.hash(password, 10)
        return contrasenaEncriptada
    } catch (error) {
        console.error(`Error en el hash: ${error.message}`);
    }
}

const generarToken = (datos) => {

    try {

        const datosInToken = jwt.sign({
            data: datos
        }, process.env.JWT_TOKEN,
            { expiresIn: '1h' }
        );

        return datosInToken;

    } catch (error) {
        console.error(`Error generar token: ${error.message}`);
    }
}


const signUp = async (req, res) => {
    const { username, password, email, avatarUrl } = req.body;
    try {
        const consultarUsuarioExistente = await UserModel.findOne({
            username: username
        }) // Consulto en la BD si existe el usuario

        if (consultarUsuarioExistente) {
            return res.status(403).json({
                message: 'Este nombre de usuario ya esta registrado'
            }) // Doy un mensaje de respuesta en caso de que exista
        }

        const consultarCorreoExistente = await UserModel.findOne({
            email: email
        }) // Consulto Email

        if (consultarCorreoExistente) {
            return res.status(403).json({
                message: 'Este correo electronico ya esta registrado'
            }) // Doy mensaje si existe email
        }


        const contrasenaEncriptada = await encriptarContrasena(password);
        // Ocupo la funcion creada para hashear la contrasena;


        const usuarioRegistrado = await UserModel.create({
            username: username,
            password: contrasenaEncriptada,
            email: email,
            avatarUrl: avatarUrl,
        }) // Creo el usuario

        res.status(201).json({
            message: 'Usuario creado con exito',
            usuarioRegistrado
        })

    } catch (error) {
        console.error(error.message);
    }
}


const signIn = async (req, res) => {
    const { inputLogin, password } = req.body; // Extraigo los datos de correo o nombre de usuario y contrasena del Body de la peticion

    try {
        let consultarUsuarioExistente = await UserModel.findOne({
            username: inputLogin
        }) // Consulto si existe usuario


        if (!consultarUsuarioExistente) { // Si no existe usuario

            const consultarEmail = await UserModel.findOne({
                email: inputLogin
            }) // Se consulta si hay algun email coincidente

            if (!consultarEmail) {
                res.status(403).json({
                    message: 'Usuario o Email no validos'
                })
            } // Si no se encuentra mail arroja error

            consultarUsuarioExistente = consultarEmail;
            // Cambia el null de la primera consulta fallida, por los datos de la consulta exitosa del email
        }

        const comprobarContrasena = await bcrypt.compare(password, consultarUsuarioExistente.password); // Comparo la contrasena del body de la peticion con el objeto que me devuelve las consultas anteriores

        if (!comprobarContrasena) {
            return res.status(401).json({
                message: 'Contrasena invalida'
            });
        } // Si no coinciden contrasenas

        // Llamo a la funcion  del token creada anteriormente
        const tokenInUsuario = generarToken(consultarUsuarioExistente)

        res.status(200).json({
            message: 'Inicio de Sesion Exitoso',
            tokenInUsuario,
            usuario: {
                id: consultarUsuarioExistente._id
            }
        }) // Envio los datos;
    } catch (error) {
        console.error(`Error al iniciar sesion: ${error.message}`);
    }
}


module.exports = {
    signUp,
    signIn
}