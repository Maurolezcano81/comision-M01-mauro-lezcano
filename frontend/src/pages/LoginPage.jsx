import { useState } from 'react';

const LoginPage = () => {

    const [mensajeFormulario, setmensajeFormulario] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }


    const handleForm = async (e) => {
        e.preventDefault();

        if (username.trim() === '') {
            setUsernameError('Ingrese un nombre de usuario');
            const divErrorLogin = document.getElementById('usernameError');
            divErrorLogin.classList.remove('hidden');
            divErrorLogin.innerText = usernameError;
            return;
        } else{
            const divErrorLogin = document.getElementById('usernameError');
            divErrorLogin.classList.add('hidden');
        }

        if (password.trim() === '') {
            setPasswordError('Ingrese una contraseña');
            const divErrorLogin = document.getElementById('passwordError');
            divErrorLogin.classList.remove('hidden');
            divErrorLogin.innerText = passwordError;
            return;
        } else{
            setPasswordError('Ingrese una contraseña');
            const divErrorLogin = document.getElementById('passwordError');
            divErrorLogin.classList.add('hidden');
        }

        try {

            const response = await fetch('http://127.0.0.1:3000/api/signin',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputLogin: username,
                    password: password
                })
            })


            if(response.status === 403){
                const data = await response.json();
                const mensajeError = document.getElementById('mensajeFormulario');
                setmensajeFormulario(data.message);
                mensajeError.innerText = mensajeFormulario
                mensajeError.classList.remove('hidden')
                mensajeError.classList.add('bg-red-400')

                setTimeout( () =>{
                    mensajeError.classList.add('hidden');
                },5000)
            } else{
                const data = await response.json();

                const mensajeError = document.getElementById('mensajeFormulario');
                setmensajeFormulario(data.message);
                mensajeError.innerText = mensajeFormulario
                mensajeError.classList.remove('hidden')
                mensajeError.classList.add('bg-green-600');


                // Utilizo LocalStorage para almacenar los datos de la Id del usuario y el token creado desde el servidor.
                localStorage.setItem('idUsuario', data.usuario.id);
                localStorage.setItem('token', data.tokenInUsuario);
                localStorage.setItem('imgPerfil', data.usuario.imgPerfil);
                localStorage.setItem('username', data.usuario.username);

                
                setTimeout( () =>{
                    mensajeError.classList.add('hidden');
                    location.href = '/'
                },2000);
            }

        } catch(error){
            console.error(error);
        }



    }

    return (

        <>
            <p className='p-3 hidden text-center w-full absolute t-0 text-white' id='mensajeFormulario'>{mensajeFormulario}</p>

            <div className='shadow-2xl bg-teal-900 w-screen h-screen flex justify-center items-center' >

                <form onSubmit={handleForm} className='bg-gray-200 rounded p-2 bg-opacity-80' method='post' action="">
                    <div className='w-96 text-center text-xl'>
                        <h2>Iniciar Sesion</h2>
                    </div>

                    <div className='w-96'>

                        <div className='flex flex-col mt-5 px-4'>
                            <label htmlFor="username">Nombre de usuario o email:</label>
                            <input onChange={changeUsername} className='input p-1 rounded mt-1' type="text" name="username" id="username" />
                            <p id='usernameError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{usernameError}</p>
                        </div>

                        <div className='flex flex-col mt-5 px-4'>
                            <label htmlFor="password">Contraseña:</label>
                            <input onChange={changePassword} className='input p-1 rounded mt-1' type="password" name="password" id="password" />
                            <p id='passwordError' className='text-sm text-red-600 bg-red-200 mt-1 hidden'>{passwordError}</p>
                        </div>


                        <div className='w-96 text-center my-3'>
                            <button type='submit' className='p-2 bg-blue-600 text-white rounded'>Iniciar Sesion</button>
                        </div>

                    </div>
                </form>
            </div>
        </>

    )
}

export default LoginPage;