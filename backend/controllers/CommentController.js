const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');

const anadirComentario = async (req, res) => {
    const { idPost } = req.params;
    const { autor, description } = req.body;

    try {
        const nuevoComentario = await CommentModel.create({
            autor: autor,
            description: description
        })


        const postActual = await PostModel.findOne({
            _id: idPost
        });


        const actualizacionPost = await PostModel.findOneAndUpdate(
            { _id: postActual._id },
            {
                $push: {
                    comments: nuevoComentario._id,
                }
            },
            { new: true },
        )

        res.status(200).json({
            message: "Comentario realizado exitosamente",
            actualizacionPost
        })

    } catch (error) {
        console.error(error.name, error.message);
    }
}

const eliminarComentario = async (req, res, next) => {
    const { id } = req.params;
    try {
        const comentarioActual = await CommentModel.findOneAndDelete({ _id: id });
        res.status(200).json({
            message: "Comentario Eliminado",
            comentarioActual
        })

    } catch (error) {
        console.error(error.name, error.message);
    }
}

module.exports = {
    anadirComentario,
    eliminarComentario
}