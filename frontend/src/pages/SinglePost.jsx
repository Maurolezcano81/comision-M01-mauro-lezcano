import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import CrearComentario from '../components/CrearComentario';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const SinglePost = () => {
    const apiUrl = import.meta.env.VITE_SV_URL;
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const idUsuario = localStorage.getItem('idUsuario');

    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`${apiUrl}/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/post/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const data = await response.json();
                setPost(data.post);
            } catch (error) {
                console.error(error);
            }
        };


        fetchData();
    }, [postId, apiUrl]);

    if (!post) {
        return <div>Cargando...</div>;
    }

    console.log(post);

    return (

        <div className='w-full py-4 min-h-screen h-auto bg-teal-50'>
            <BackButton url='/' />
            <div key={post._id} className="text-white p-5 rounded bg-gray-800 bg-opacity-50 w-1/2 my-0 mx-auto flex flex-col justify-center items-center">
                {/* <CrearComentario /> */}
                <div className="uppercase flex w-full text-left">
                    <div>
                        <img className="max-h-10 h-10 rounded-full border mr-4" src={post.autor.avatarUrl} alt="asd" />
                    </div>

                    <div className='flex justify-center items-center'>
                        <h4>{post.autor.username}</h4>

                    </div>

                </div>
                <div className="postDescripcion">
                    <div className='descripcionTitulo uppercase mb-4 mt-2 border-b-2'>
                        <h4>{post.title}</h4>
                    </div>
                    <div className="descripcionTexto mb-4">
                        <p>{post.description}</p>
                    </div>
                    <div className="descripcionImagen">
                        <img src={post.imageUrl} alt="" />
                    </div>
                    <div className="descripcionFecha">
                        <p><small>{post.createdAt}</small></p>
                    </div>
                </div>
                <hr></hr>
                <h2>Comentarios</h2>
                <CrearComentario />
                <div className='comentarioContainer'>
                    {post.comments.map(comment => (
                        <div className='w-96 border-2 mt-2 rounded p-2' key={comment._id}>
                            <div className="w-full h-10 flex">
                                <div>
                                    <img className="w-8 h-8 mr-2" src={comment.autor.avatarUrl} alt="" />
                                </div>

                                <h4>{comment.autor.username}</h4>
                            </div>
                            <p className='descripcionTexto'>{comment.description}</p>

                            {comment.autor._id === idUsuario && (
                                <>
                                    <button className='text-right w-full hover:text-red-400' onClick={() => handleDelete(comment._id)}>
                                        <DeleteOutlineIcon/>
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>



    );
};

export default SinglePost;