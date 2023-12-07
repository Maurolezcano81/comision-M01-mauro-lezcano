
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ url }) =>{

    return(

        <Link 
        to={url}
        className='opacity-80 ml-5 fixed top-0 left-0 p-3 rounded-full mt-5 bg-gray-400 text-black flex items-center justify-center' 
        >
            <ArrowBackIcon />
            Volver
        </Link>

    )
}

export default BackButton