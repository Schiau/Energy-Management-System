import { useNavigate } from 'react-router-dom';
import GenericBtn from '../GenericBtn/GenericBtn'

function LogOutBtn(){
    const navigate = useNavigate();
    const handleClick = () => 
    {
        localStorage.removeItem("token")
        navigate("/")
    }

    return(
        <>
        <GenericBtn img='./exit.svg' handler ={handleClick} text="Log Out" showImg={true}/>
        </>
    )
}

export default LogOutBtn