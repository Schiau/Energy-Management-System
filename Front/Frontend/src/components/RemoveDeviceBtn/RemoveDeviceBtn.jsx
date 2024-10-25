import PropTypes from 'prop-types'
import GenericBtn from '../GenericBtn/GenericBtn'
import { Remove } from '../../services/ServiceDevice'

function RemoveDeviceBtn({deviceId, updateFunction}){
    const handleClick = async () => {
        try {
            await Remove(+deviceId); 
            updateFunction()
            console.log(`User with ID ${deviceId} removed successfully.`);
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    return(
        <>
        <GenericBtn img = "./remove.svg" handler ={handleClick} />
        </>
    )
}

RemoveDeviceBtn.prototype={
    deviceId: PropTypes.number.isRequired,
    updateFunction: PropTypes.func.isRequired
}

export default RemoveDeviceBtn