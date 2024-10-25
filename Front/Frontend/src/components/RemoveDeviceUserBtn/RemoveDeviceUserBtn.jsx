import PropTypes from 'prop-types'
import GenericBtn from '../GenericBtn/GenericBtn'
import { RemoveDeviceFromUser as remove } from '../../services/ServiceDevice';
function RemoveDeviceUserBtn({deviceId,  updateFunction}){
    const handleClick = async () =>
        {
            try {
            await remove(deviceId)
            updateFunction()
        } catch (error) {
            console.error('Error removing user:', error);
        }}

    return(
        <>
        <GenericBtn img = "/remove.svg" handler ={handleClick} />
        </>
    )
}

RemoveDeviceUserBtn.propTypes={
    userId: PropTypes.number.isRequired,
    deviceId: PropTypes.number.isRequired,
    updateFunction: PropTypes.func.isRequired
}

export default RemoveDeviceUserBtn