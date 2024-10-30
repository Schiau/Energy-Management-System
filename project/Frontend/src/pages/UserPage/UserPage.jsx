import { useEffect, useState } from 'react';
import ListDevice from "../../components/DevicesList/ListDevices";
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn'
import { GetDevicesByUserId } from "../../services/ServiceDevice";
import { getUserByToken } from '../../services/ServiceUser';
import './UserPage.css';

function UserPage() {

    const [text, setText] = useState(); 
    const [devices, setDevices] = useState([]); 

    useEffect(() => {
        const fetchDevices = async () => {
            const currentUser = await getUserByToken();
            const devicesData = await GetDevicesByUserId(currentUser.id);
            setDevices(devicesData); 
            setText(`${currentUser.firstName} ${currentUser.lastName}`)
        };

        fetchDevices(); 
    }, []); 

    return (
        <div className="user-page">
            <h1>Welcome {text}</h1>
            <ListDevice devices={devices} /> 
            <div className='buttons'>
                <LogOutBtn/>
            </div>
        </div>
    );
}

export default UserPage;
