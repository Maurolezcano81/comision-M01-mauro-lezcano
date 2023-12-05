import { useState } from 'react'

const RegisterPage = () => {

    const [mensajeFormulario, setMensajeFormulario] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [avatarUrlError, setAvatarUrlError] = useState('');


    const changeUsername = (e) => {
        setUsername(e.target.value.toLowerCase().trim())
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value.toLowerCase())
    }

    const changeAvatarUrl = (e) => {
        setAvatarUrl(e.target.value.toLowerCase())
    }

    const handleForm = async (e) => {
        e.preventDefault();

        if (username.trim() === '') { // Validacion de espacio vacio en el nombre de usuario
            const divErrorUser = document.getElementById('usernameError');
            divErrorUser.classList.remove('hidden');
            setUsernameError('Por favor introduzca un nombre de usuario');
            return;
        } else {
            const divErrorUser = document.getElementById('usernameError');
            divErrorUser.classList.add('hidden');
        }


        if (password.trim() === '') { // Validacion de espacio vacio en contrasena
            const divErrorUser = document.getElementById('passwordError');
            divErrorUser.classList.remove('hidden');
            setPasswordError('Por favor introduzca una contraseña');
            return;
        } else {
            const divErrorUser = document.getElementById('passwordError');
            divErrorUser.classList.add('hidden');
        }

        if (email.trim() === '') { // Validacion de espacio vacio en el email
            const divErrorUser = document.getElementById('emailError');
            divErrorUser.classList.remove('hidden');
            setEmailError('Por favor introduzca un email valido');
            return;
        } else {
            const divErrorUser = document.getElementById('emailError');
            divErrorUser.classList.add('hidden');
        }

        if (avatarUrl.trim() === '') { // Validacion de espacio vacio en el url del avatar
            const divErrorUser = document.getElementById('avatarUrlError');
            divErrorUser.classList.remove('hidden');
            setAvatarUrlError('Por favor introduzca un enlace valido');
            return;
        } else {
            const divErrorUser = document.getElementById('avatarUrlError');
            divErrorUser.classList.add('hidden');
        }


        try {

            const response = await fetch('http://127.0.0.1:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    avatarUrl: avatarUrl
                })
            })

            if(response.ok){ // Aviso de solicitud creada exitosamente
                const data = await response.json();
                const mensajeModal = document.getElementById('mensajeFormulario');
                mensajeModal.classList.add('bg-green-600');
                mensajeModal.classList.remove('hidden')
                setMensajeFormulario(data.message);
                mensajeModal.innerText = mensajeFormulario;
                

                setTimeout( ()=>{
                    mensajeModal.classList.add('hidden');
                    window.location.href = '/signin';
                }, 2000)

            } else if(response.status === 403){ // Aviso de errores desde el lado del backend
                console.log(response);
                const data = await response.json();
                console.log(data);
                const mensajeModal = document.getElementById('mensajeFormulario');

                mensajeModal.classList.remove('bg-green-600', 'hidden');
                mensajeModal.classList.add('bg-red-400')
                setMensajeFormulario(data.message);
                mensajeModal.innerText = `${mensajeFormulario}`;

                setTimeout( ()=>{
                    mensajeModal.classList.add('hidden');
                }, 5000)
            }

        } catch (error) {
            console.log(error);
        }
    }
        return (

            <>
                <p className='p-3 hidden text-center w-full absolute t-0 text-white' id='mensajeFormulario'>{mensajeFormulario}</p>

                <form onSubmit={handleForm} className='shadow-2xl bg-teal-900 w-screen h-screen flex justify-center items-center' method='post' action=''>

                    <div className='bg-gray-200 rounded p-2 bg-opacity-80'>
                        <div className='w-96 text-center text-xl'>
                            <h2>Registrar Usuario</h2>
                        </div>

                        <div className='w-96'>

                            <div className='flex flex-col mt-5 px-4'>
                                <label htmlFor="username">Nombre de usuario:</label>
                                <input onChange={changeUsername} className='input p-1 rounded mt-1' type="text" name="username" id="username" />
                                <p id='usernameError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{usernameError}</p>
                            </div>

                            <div className='flex flex-col mt-5 px-4'>
                                <label htmlFor="password">Contraseña:</label>
                                <input onChange={changePassword} className='input p-1 rounded mt-1' type="password" name="password" id="password" />
                                <p id='passwordError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{passwordError}</p>
                            </div>

                            <div className='flex flex-col mt-5 px-4'>
                                <label htmlFor="email">Correo Electronico: </label>
                                <input onChange={changeEmail} className='input p-1 rounded mt-1' type="text" name="email" id="email" />
                                <p id='emailError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{emailError}</p>
                            </div>

                            <div className='flex flex-col mt-5 px-4'>
                                <label htmlFor="avatarUrl" >Avatar: </label>
                                <input onChange={changeAvatarUrl} placeholder='Ingrese un enlace para avatar' className='input p-1 rounded mt-1' type="text" name="avatarUrl" id="avatarUrl" />
                                <p id='avatarUrlError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{avatarUrlError}</p>
                            </div>

                            <div className='w-96 text-center my-3'>
                                <button type='submit' className='p-2 bg-blue-600 text-white rounded'>Registrarme</button>
                            </div>


                        </div>
                    </div>

                </form>
            </>

        )
}

export default RegisterPage