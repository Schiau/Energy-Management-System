import { useNavigate } from 'react-router-dom';
import GenericBtn from '../GenericBtn/GenericBtn'

function AddNewUserBtn({updateFunction}){
    const navigate = useNavigate();
    const handleClick = () => 
    {
        updateFunction()
        updateFunction()
        navigate("/admin/user")
    }

    return(
        <>
        <GenericBtn img='./addNew.svg' handler ={handleClick} text="Add new user" showImg={true}/>
        </>
    )
}

export default AddNewUserBtn