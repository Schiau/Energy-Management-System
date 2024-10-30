import PropTypes from 'prop-types'
import GenericBtn from '../GenericBtn/GenericBtn'
import { AddDeviceToUser as add} from '../../services/ServiceDevice'

function AddDeviceUser({userId, deviceId,  updateFunction}){
    const handleClick = async () =>
    {
        try {
        await add(deviceId,userId)
        updateFunction()
    } catch (error) {
        console.error('Error removing user:', error);
    }}


    return(
        <>
        <GenericBtn img= "/addNew.svg" handler ={handleClick} text="Add device" showImg={true}/>
        </>
    )
}

AddDeviceUser.prototype={
    userId: PropTypes.number.isRequired,
    deviceId: PropTypes.number.isRequired,
    updateFunction: PropTypes.func.isRequired
}

export default AddDeviceUser