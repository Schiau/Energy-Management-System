import { useEffect, useState } from 'react';
import ListDevice from "../../components/DevicesList/ListDevices";
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn'
import { GetAll } from "../../services/ServiceDevice";
import './UserPage.css';

function UserPage() {
    const [devices, setDevices] = useState([]); 

    useEffect(() => {
        const fetchDevices = async () => {
            const devicesData = await GetAll();
            setDevices(devicesData); 
        };

        fetchDevices(); 
    }, []); 

    return (
        <div className="user-page">
            <h1>Welcome</h1>
            <ListDevice devices={devices} /> 
            <div className='buttons'>
                <LogOutBtn/>
            </div>
        </div>
    );
}

export default UserPage;
