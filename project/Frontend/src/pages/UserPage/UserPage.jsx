import { useEffect, useState, useCallback, useMemo } from 'react';
import ListDevice from "../../components/DevicesList/ListDevices";
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn'
import { GetDevicesByUserId } from "../../services/ServiceDevice";
import { getUserByToken } from '../../services/ServiceUser';
import './UserPage.css';
import useDeviceWebSocket from '../../services/useDeviceWebSocket';
function UserPage() {

    const [text, setText] = useState('');
    const [devices, setDevices] = useState([]);
    const [devicesOverEnergy, setDevicesOverEnergy] = useState([]);
    const { isConnected, overEnergyMessage, init } = useDeviceWebSocket();


    const filteredDevices = useMemo(() => {
        return devices.filter(item =>
            overEnergyMessage.some(firstItem => firstItem.deviceId === item.id)
        );
    }, [devices, overEnergyMessage]);

    const fetchDevices = useCallback(async () => {
        const currentUser = await getUserByToken();
        const devicesData = await GetDevicesByUserId(currentUser.id);
        setDevices(devicesData);
        setText(`${currentUser.firstName} ${currentUser.lastName}`);
    }, []);

    // Fetch devices on first load and when `isConnected` changes
    useEffect(() => {
        if (isConnected) {
            init();
            fetchDevices();
        }
    }, [isConnected, fetchDevices, init]);

    // Update the `devicesOverEnergy` whenever `filteredDevices` changes
    useEffect(() => {
        setDevicesOverEnergy(filteredDevices);
    }, [filteredDevices]);
    
    return (
        <div className="user-page">
            <h1>Welcome {text}</h1>
            <div className='container'>
            <ListDevice devices={devices} onClick={true}/> 
                {devicesOverEnergy.length !== 0 && (
                <div className="alert-devices">
                    <p className="alert-title">Devices which exceed energy consumption are:</p>
                    <ul>
                        {devicesOverEnergy.map(device => (
                            <li key={device.id}>
                                {device.description} (Location: {device.location}, Energy: {device.energyConsumption} kWh)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </div>
            <div className='buttons'>
                <LogOutBtn/>
            </div>
        </div>
    );
}

export default UserPage;
