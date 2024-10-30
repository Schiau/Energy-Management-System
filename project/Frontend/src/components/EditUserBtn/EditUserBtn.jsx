import PropTypes from 'prop-types'
import GenericBtn from '../GenericBtn/GenericBtn'
import { useNavigate } from 'react-router-dom'

function EditUserBtn({userId, updateFunction}){
    const navigator = useNavigate()
    const handleClick = () => {
        updateFunction()
        updateFunction()
        navigator(`/admin/user/${userId}`)
    }

    return(
        <>
        <GenericBtn img='./edit.svg' handler ={handleClick} text="Edit" showImg={true}/>
        </>
    )
}

EditUserBtn.prototype={
    userId: PropTypes.number.isRequired,
    updateFunction: PropTypes.func.isRequired
}
export default EditUserBtn