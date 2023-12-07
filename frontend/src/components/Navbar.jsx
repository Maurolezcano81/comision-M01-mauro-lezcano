import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () =>{

    const avatar =localStorage.getItem('imgPerfil');
    const username = localStorage.getItem('username');

    const botonCerrarSesion = document.getElementById('botonCerrarSesion');

    if(botonCerrarSesion){
        botonCerrarSesion.addEventListener('click', () =>{
            localStorage.clear();
        })
    }

    return(
        <>

            <nav className="text-white bg-cyan-950 h-20 p-3 flex items-center justify-between shadow">

                <div className="w-auto flex flex-row gap-5 justify-center items-center">
                    <div className='w-20 p-3'>
                        <img className='w-full border rounded-full' src={avatar} alt="avatar" />
                    </div>
                    <div className='w-1/2'>
                        <h2>{username}</h2>
                    </div>
                </div>

                <div>
                    <Link className='flex items-center p-3 bg-cyan-400 text-black rounded hover:bg-cyan-600' to="/new/post">
                        <AddIcon />
                        Crear un nuevo post 
                         </Link>
                </div>

                <div>
                    <Link id='botonCerrarSesion' className='flex items-center gap-2'
                    to='/signin'>

                        <LogoutIcon />
                        Cerrar Sesion
                    </Link>
                </div>

            </nav>
        </>

    )
}

export default Navbar;