import { useState } from 'react';
import { useParams } from 'react-router-dom';
const CrearComentario = () => {

    const { postId } = useParams();
    const idUsuario = localStorage.getItem('idUsuario');

    const [description, setDescription] = useState('');

    const [descriptionError, setDescriptionError] = useState('');

    const apiUrl = import.meta.env.VITE_SV_URL;
    const token = localStorage.getItem('token');

    const handlerComment = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (description.trim() === '') {
            setDescriptionError('Completar el campo es obligatorio');
            return;
        } else {
            setDescriptionError('');
        }


        try {
            fetch(`${apiUrl}/post/comment/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    autor: idUsuario,
                    description: description
                })
            })
                .then(() => {
                    location.href = `/post/${postId}`;
                })
        } catch (error) {
            console.error(error.name, error.message)
        }

    }


    return (
        <>
            <form className='comentario' method='post' onSubmit={handleSubmitComment}>
                <textarea className='w-96 rounded p-2 text-gray-950' onChange={handlerComment} name="comentario" id="comentario" placeholder='introduce tu comentario aqui...'></textarea>
                <div className='text-red-600'>{descriptionError}</div>
                <div className='w-full text-center'>
                <button className='p-2 bg-emerald-600 hover:bg-emerald-700 my-2' type='Submit'>Anadir comentario</button>
                </div>
                <hr></hr>
            </form>
        </>
    )
}

export default CrearComentario;