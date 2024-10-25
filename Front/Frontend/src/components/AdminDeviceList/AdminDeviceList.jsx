import PropTypes from 'prop-types';
import Device from '../Device/Device';
import './AdminDeviceList.css'
import AddNewDeviceBtn from '../AddNewDeviceBtn/AddNewDeviceBtn'
import EditDeviceBtn from '../EditDeviceBtn/EditDeviceBtn';
import RemoveDeviceBtn from '../RemoveDeviceBtn/RemoveDeviceBtn';

function AdminDeviceList({ devices = [], updateFunction}) {
    return (
        <div className="admin-list-device">
            <h2 className="list-device-title">Device List</h2>
            <AddNewDeviceBtn />
            {devices.length === 0 ? (
                <p className="no-devices-message">No devices available.</p> 
            ) : (
                <>
                <ul className="device-list">
                    {devices.map(({ id, name, location, energyConsumption, description }) => (
                        <li key={id} className="device-item">
                            <Device
                                name={name}
                                location={location}
                                energyConsumption={energyConsumption}
                                description={description}
                            />
                            <div className='btns'>
                                <EditDeviceBtn deviceId = {id}/>
                                <RemoveDeviceBtn deviceId = {id} updateFunction={updateFunction}/>
                            </div>
                        </li>
                    ))}
                </ul>
                </>
            )}
        </div>
    );
}

AdminDeviceList.propTypes = {
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            location: PropTypes.string,
            energyConsumption: PropTypes.string,
            description: PropTypes.string,
        })
    ).isRequired,
    updateFunction:PropTypes.func.isRequired
};

export default AdminDeviceList;
