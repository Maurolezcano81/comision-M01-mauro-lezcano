import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

const EditPost = () => {

    // const token = localStorage.getItem('token');
    const { postId } = useParams();
    const apiUrl = import.meta.env.VITE_SV_URL;


    const [post, setPost] = useState([]);

    const [title, setTitle] = useState(post.title || '');
    const [description, setDescription] = useState(post.description || '');
    const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
    const [mensajeFormulario, setMensajeFormulario] = useState('');

    const autor = localStorage.getItem('idUsuario');

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const changeImageUrl = (e) => {
        setImageUrl(e.target.value);
    }


    useEffect ( () =>{
        const postAEditar = async () =>{
            
            try {
                const response = await fetch(`${apiUrl}/post/${postId}`,{
                    method: 'get',
                    headers:{
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`
                    }
                })
    
                if(response.ok){
                    const data = await response.json();
                    setPost(data.post);
                } else{
                    throw new Error('Error al obtener los datos')
                }
            } catch (error) {
                console.error(error.name, error.message);
            }
        }
        postAEditar();
    }, [apiUrl, postId])

    const handleForm = async (e) => {
        e.preventDefault();

        if (title.trim() === '') {
            const divErrorUser = document.getElementById('titleError');
            divErrorUser.classList.remove('hidden');
            setTitleError('Por favor introduzca un titulo');
            return;
        } else {
            const divErrorUser = document.getElementById('titleError');
            divErrorUser.classList.add('hidden');
        }

        if (description.trim() === '') {
            const divErrorUser = document.getElementById('descriptionError');
            divErrorUser.classList.remove('hidden');
            setDescriptionError('Por favor introduzca una descripcion');
            return;
        } else {
            const divErrorUser = document.getElementById('descriptionError');
            divErrorUser.classList.add('hidden');
        }

        if (imageUrl.trim() === '') {
            const divErrorUser = document.getElementById('imageUrlError');
            divErrorUser.classList.remove('hidden');
            setImageUrlError('Por favor introduzca un enlace para la imagen');
            return;
        } else {
            const divErrorUser = document.getElementById('imageUrlError');
            divErrorUser.classList.add('hidden');
        }


        try {

            const response = await fetch(`${apiUrl}/post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    autor: autor,
                    imageUrl: imageUrl,

                })
            })

            if (response.ok) {
                const data = await response.json();

                const mensajeModal = document.getElementById('mensajeFormulario');
                mensajeModal.classList.add('bg-green-600');
                mensajeModal.classList.remove('hidden')
                setMensajeFormulario(data.message);
                mensajeModal.innerText = mensajeFormulario;


                setTimeout(() => {
                    mensajeModal.classList.add('hidden');
                    location.href = '/';
                }, 2000)
            } else if (response.status === 403) { // Aviso de errores desde el lado del backend
                console.log(response);
                const data = await response.json();
                console.log(data);
                const mensajeModal = document.getElementById('mensajeFormulario');

                mensajeModal.classList.remove('bg-green-600', 'hidden');
                mensajeModal.classList.add('bg-red-400')
                setMensajeFormulario(data.message);
                mensajeModal.innerText = `${mensajeFormulario}`;

                setTimeout(() => {
                    mensajeModal.classList.add('hidden');
                }, 5000)
            }

        } catch (error) {
            console.error(error.name, error.message)
        }

    }


    return (

        <>
            <p className='p-3 hidden text-center w-full absolute t-0 text-white' id='mensajeFormulario'>{mensajeFormulario}</p>

            <div className='flex items-center justify-center bg-gray-200 w-full h-screen'>
                <BackButton url='/' />


                <form onSubmit={handleForm} method='post' action=''
                    className='bg-blue-950 text-white shadow-xl rounded p-2 bg-opacity-80'>
                    <div className='w-96 text-center text-xl'>
                        <h2>Crear un Post</h2>
                    </div>

                    <div className='w-96'>

                        <div className='flex flex-col mt-5 px-4'>
                            <label htmlFor="title">Titulo:</label>
                            <input onChange={changeTitle} value={title} className='text-black input p-1 rounded mt-1' type="text" name="title" id="title" />
                            <p id='titleError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{titleError}</p>
                        </div>

                        <div className='flex flex-col mt-5 px-4'>
                            <label htmlFor="description">Descripcion:</label>
                            <textarea onChange={changeDescription} value={description} className='text-black input p-1 rounded mt-1' type="text" name="description" id="description" />
                            <p id='descriptionError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{descriptionError}</p>
                        </div>

                        <div className='flex flex-col mt-5 px-4'>
                            <label htmlFor="imageUrl">Url de imagen:</label>
                            <input onChange={changeImageUrl} value={imageUrl} className='text-black input p-1 rounded mt-1' type="text" name="imageUrl" id="imageUrl" />
                            <p id='imageUrlError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{imageUrlError}</p>
                        </div>

                        <div className='w-96 text-center my-3'>
                            <button type='submit' className='p-2 bg-blue-600 text-white rounded'>Editar Post</button>
                        </div>
                    </div>

                </form>
            </div>

        </>
    )
}

export default EditPost