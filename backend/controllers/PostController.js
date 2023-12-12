const PostModel = require('../models/PostModel');

const crearPost = async (req, res) =>{
    // Recibo por el cuerpo de la peticion los campos para crear un post
    const { title, description, autor, imageUrl } = req.body;
    

    try{
        // Creo un nuevo posteo
        const postNuevo = await PostModel.create({
            title: title,
            description: description,
            autor: autor,
            imageUrl: imageUrl
        })

        // En caso de que no se cree el posteo, arroja un error para ser servido en el frontend
        if(!postNuevo){
            res.status(403).json({
                message: 'Error al crear el posteo'
            })
        }

        // En caso de que sea exitoso, se recibe un mensaje de 
        res.status(201).json({
            message: 'Post creado exitosamente',
            postNuevo: {
                title,
                description,
                autor
            }
        })

    } catch(error){
        console.error(error);
    }
}

const mostrarPosts = async (req, res)  =>{

    try {
        const mostrarPosts = await PostModel.find();

        if(!mostrarPosts) {
            res.status(403).json({
                message: "Error al obtener los posts"
            })
        }


        res.status(200).json({
            message: "Posts obtenidos con exito",
            mostrarPosts
        })
    } catch (error) {
        console.error(error);
    }
}

const eliminarPost = async (req, res) => {
    const idPost = req.params.id
    
    try{

        const postEliminado = await PostModel.findByIdAndDelete(idPost)

        if(!postEliminado){
            res.status(403).json({
                message: "Error al eliminar el post"
            })
        }

        res.status(200).json({
            message: "Post eliminado exitosamente",
            postEliminado
        });

    } catch(error){
        console.error(error);
    }
}

const editarPost = async (req, res) =>{
    const idPost = req.params.id
}
module.exports = {
    crearPost,
    mostrarPosts,
    eliminarPost
}