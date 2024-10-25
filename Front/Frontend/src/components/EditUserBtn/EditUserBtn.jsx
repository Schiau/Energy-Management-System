import PropTypes from 'prop-types'
import GenericBtn from '../GenericBtn/GenericBtn'
import { useNavigate } from 'react-router-dom'

function EditUserBtn({userId}){
    const navigator = useNavigate()
    const handleClick = () => {
        navigator(`/admin/user/${userId}`)
    }

    return(
        <>
        <GenericBtn img='./edit.svg' handler ={handleClick} text="Edit" showImg={true}/>
        </>
    )
}

EditUserBtn.prototype={
    userId: PropTypes.number.isRequired
}
export default EditUserBtn