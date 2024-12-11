import { useEffect, useState } from 'react';
import ListDevice from "../../components/DevicesList/ListDevices";
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn'
import { GetDevicesByUserId } from "../../services/ServiceDevice";
import { getUserByToken } from '../../services/ServiceUser';
import './UserPage.css';
import useDeviceWebSocket from '../../services/useDeviceWebSocket';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
function UserPage() {

    const [text, setText] = useState('');
    const [devices, setDevices] = useState([]);
    const [devicesOverEnergy, setDevicesOverEnergy] = useState([]);
    const { isConnected, overEnergyMessage, init } = useDeviceWebSocket();

    useEffect(() => {
        if (isConnected) {
            init();
        }
    },[isConnected])

    const filteredDevices = () =>  devices.filter(item => overEnergyMessage.some(firstItem => firstItem.deviceId === item.id))

    useEffect(() => {
        const fetchDevices = async () => {
            const currentUser = await getUserByToken();
            const devicesData = await GetDevicesByUserId(currentUser.id);
            setDevices(devicesData);
            setText(`${currentUser.firstName} ${currentUser.lastName}`);
            setDevicesOverEnergy(filteredDevices);
            console.log(overEnergyMessage)
        }
            fetchDevices();
    }, [overEnergyMessage])
    
    return (
        <div className="user-page">
            <h1>Welcome {text}</h1>
            <div className='container'>
            <ChatRoom userName={text}/>
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
