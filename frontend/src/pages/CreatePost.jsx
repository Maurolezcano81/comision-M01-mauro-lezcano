import { useState } from 'react';
import BackButton from '../components/BackButton';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');



    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const changeTitle = (e) =>{
        setTitle(e.target.value);
    }

    const changeDescription = (e) =>{
        setDescription(e.target.value);
    }



    const handleForm =() =>{
        console.log('hola');
    }
    
    return (

        <>

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
                            <input onChange={changeTitle} className='text-black input p-1 rounded mt-1' type="text" name="title" id="username" />
                            <p id='titleError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{titleError}</p>
                        </div>

                        <div className='flex flex-col mt-5 px-4'>
                            <label htmlFor="description">Descripcion:</label>
                            <textarea onChange={changeDescription} className='text-black input p-1 rounded mt-1' type="text" name="description" id="username" />
                            <p id='descriptionError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{titleError}</p>
                        </div>

                    </div>

                </form>
            </div>

        </>
    )
}
// FALTA TERMINAR EL FORMULARIO, Y HACER LAS AUTORIZACIONES EN EL BACKEND
export default CreatePost