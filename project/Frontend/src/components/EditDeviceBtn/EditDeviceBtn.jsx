import PropTypes from 'prop-types'
import GenericBtn from '../GenericBtn/GenericBtn'
import { useNavigate } from 'react-router-dom'

function EditDeviceBtn({deviceId, updateFunction}){
    const navigator = useNavigate()
    const handleClick = () => {
        navigator(`/admin/device/${deviceId}`)
        updateFunction()
    }
    return(
        <>
        <GenericBtn img='./edit.svg' handler ={handleClick} text="Edit" showImg={true}/>
        </>
    )
}

EditDeviceBtn.prototype={
    userId: PropTypes.number.isRequired
}
export default EditDeviceBtn