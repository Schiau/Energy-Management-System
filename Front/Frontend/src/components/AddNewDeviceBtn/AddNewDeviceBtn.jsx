import { useNavigate } from 'react-router-dom'
import GenericBtn from '../GenericBtn/GenericBtn'

function AddNewDevice(){
    const navigator = useNavigate()
    const handleClick = () => navigator(`/admin/device`)


    return(
        <>
        <GenericBtn img = "./addNew.svg" handler ={handleClick} text="Add new device"/>
        </>
    )
}

export default AddNewDevice