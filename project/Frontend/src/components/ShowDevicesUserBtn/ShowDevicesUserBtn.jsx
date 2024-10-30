import PropTypes from 'prop-types';
import GenericBtn from "../GenericBtn/GenericBtn"
import { useNavigate } from 'react-router-dom';

function ShowDevicesUserBtn({userId}){
    const navigator = useNavigate()
    const handleClick = () => navigator(`/admin/devices/${userId}`)

    return(
        <>
        <GenericBtn handler ={handleClick} text="See all devices for user" showImg={false}/>
        </>
    )
}

ShowDevicesUserBtn.prototype={
    userId: PropTypes.number.isRequired
}
export default ShowDevicesUserBtn