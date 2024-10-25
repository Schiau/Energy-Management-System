import { useNavigate } from 'react-router-dom';
import GenericBtn from '../GenericBtn/GenericBtn'

function AddNewUserBtn(){
    const navigate = useNavigate();
    const handleClick = () => 
    {
        navigate("/admin/user")
    }

    return(
        <>
        <GenericBtn img='./addNew.svg' handler ={handleClick} text="Add new user" showImg={true}/>
        </>
    )
}

export default AddNewUserBtn