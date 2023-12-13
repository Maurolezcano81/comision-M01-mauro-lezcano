import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
const HomePage = () => {

    const apiUrl = import.meta.env.VITE_SV_URL;
    const idUsuario = localStorage.getItem('idUsuario');
    const token = localStorage.getItem('token');



    window.onload = () => {
        const alertaMensaje = document.getElementById('alertborder2');
        if (alertaMensaje) {
            if (!token) {
                alertaMensaje.classList.remove('hidden');

                setTimeout(() => {
                    window.location.href = 'signin';
                    localStorage.clear();
                }, 3000);

            } else {
                alertaMensaje.classList.add('hidden');
            }
        } else {
            console.error('El elemento con ID "alert-border-2" no existe.');
        }
    }


    const [posts, setPosts] = useState([])

    useEffect(() => {

        const peticionPosts = async () => {
            try {
                const response = await fetch(`${apiUrl}/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    setPosts(data);
                } else {
                    throw new Error('Error al obtener los datos')
                }
            } catch (error) {
                console.error(error.name, error.message);
            }
        };

        peticionPosts();

    }, [apiUrl]);

    const handleEditarPost = async () => {
        console.log('hola E');
    }

    const handleVerMasPost = async () => {
        console.log('hola E');
    }



    const handleEliminarPost = async (postId) => {
        try {
            const response = await fetch(`${apiUrl}/post/${postId}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error.name, error.message)
        }
    }


    console.log(posts.mostrarPosts);

    return (


        <>

            <div id="alertborder2" className="hidden flex items-center p-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ms-3 text-sm font-medium">
                    Primero debes iniciar sesion! Seras redirigido a la pagina de inicio de sesion...
                </div>
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>  { /* Mensaje de Alerta */}


            <div className="w-full h-auto bg-gray-100">
                <Navbar />

                <div className="w-full h-auto flex flex-wrap">
                {Array.isArray(posts.mostrarPosts) && posts.mostrarPosts.length > 0 ? (
                    posts.mostrarPosts.map(post => (

                        <div key={post._id} className="m-2 w-96 h-auto block bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="flex items-center justify-center flex-col overflow-hidden bg-cover bg-no-repeat w-96  max-h-72">
                                <img
                                    className=" w-full"
                                    src={post.imageUrl}
                                    alt="" />
                            </div>
                            <div className="p-6">
                                <h5
                                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    {post.title}
                                </h5>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    {post.description}
                                </p>
                                <p className="text-base text-neutral-600 dark:text-neutral-200">{post.autor?.username}</p>
                                <p className="text-base text-neutral-600 dark:text-neutral-200">
                                    <small className="text-neutral-500 dark:text-neutral-400">{post.createdAt}</small>
                                </p>
                            </div>

                            <div className="flex w-full h-auto p-2 justify-between items-center">
                                {post.autor?._id === idUsuario && (
                                    <>
                                        <div>
                                            <button onClick={() => handleEliminarPost(post._id)} className="mr-2 hover:text-red-400">
                                                <DeleteOutlineIcon />
                                            </button>

                                            <button onClick={() => handleEditarPost(post._id)} className="ml-2 hover:text-blue-400">
                                                <EditIcon />
                                            </button>
                                        </div>


                                        <div>
                                            <button onClick={() => handleVerMasPost(post._id)} className="mr-2 hover:text-white hover:bg-gray-700 p-2 rounded">
                                                Ver Mas...
                                                <ReadMoreIcon className="ml-2" />
                                            </button>
                                        </div>

                                    </>
                                )}


                            </div>

                        </div>

                    ))
                ) : (
                    <p>No hay posts disponibles.</p>
                )}
            </div >
                </div>
                

        </>
    )


}

export default HomePage;