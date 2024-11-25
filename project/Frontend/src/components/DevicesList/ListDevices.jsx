import PropTypes from 'prop-types';
import Device from '../Device/Device';
import './ListDevices.css'
import AddDeviceToUserBtn from '../AddDeviceToUserBtn/AddDeviceToUserBtn'
import RemoveDevceUserBtn from '../RemoveDeviceUserBtn/RemoveDeviceUserBtn';
import { useNavigate } from 'react-router-dom';

function ListDevice({title="Device List", devices = [], haveRemoveForAdmin = false, haveAddForAdmin = false, userId, updateFunction, onClick=false}) {
    const navigator = useNavigate()
    return (
        <div className="list-device">
            <h2 className="list-device-title">{title}</h2>
            {devices.length === 0 ? (
                <p className="no-devices-message">No devices available.</p> 
            ) : (
                <ul className="device-list">
                    {devices.map(({ id, name, location, energyConsumption, description }) => (
                        <li key={id} className="device-item">
                            <Device
                                name={name}
                                location={location}
                                energyConsumption={energyConsumption}
                                description={description}
                                onClick={onClick? () => navigator(`/user/device/${id}`) : () => {return}}
                            />
                            <div className="admin-btn">
                                {haveAddForAdmin && <AddDeviceToUserBtn userId={userId} deviceId={id} updateFunction={updateFunction}/>}
                                {haveRemoveForAdmin && <RemoveDevceUserBtn userId={userId} deviceId={id} updateFunction={updateFunction}/>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

ListDevice.propTypes = {
    title: PropTypes.string,
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            location: PropTypes.string,
            energyConsumption: PropTypes.number,
            description: PropTypes.string,
        })
    ).isRequired,
    haveRemoveForAdmin: PropTypes.bool,
    haveAddForAdmin: PropTypes.bool,
    userId:PropTypes.number,
    deviceId:PropTypes.number,
    updateFunction:PropTypes.func,
    onClick:PropTypes.bool
};

export default ListDevice;
