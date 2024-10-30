import PropTypes from 'prop-types'
import GenericBtn from '../GenericBtn/GenericBtn'
import { remove } from '../../services/ServiceUser'

function RemoveUserBtn({userId,  updateFunction}){
    const handleClick = async () => {
        try {
            await remove(userId); 
            updateFunction()
            console.log(`User with ID ${userId} removed successfully.`);
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

RemoveUserBtn.prototype={
    userId: PropTypes.number.isRequired,
    updateFunction: PropTypes.func.isRequired
}

export default RemoveUserBtn