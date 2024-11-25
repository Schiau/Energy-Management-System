import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getRollFromToken} from '../../services/ServiceUser'
import ListDevice from '../../components/DevicesList/ListDevices'
import { GetUnassignedDevices, GetDevicesByUserId } from '../../services/ServiceDevice';
import BackToAdminBtn from '../../components/BackToAdminBtn/BackToAdminBtn'
import './AdminUserDevices.css'

function AdminUserDevices()
{
    const { id } = useParams(); 
    const[userDevices, setUserDevices] = useState([])
    const[devices, setDevices] = useState([])

    const featchData = async () => {
        const checkAdmin = async () => {
            const role = await getRollFromToken();
            if(!role)
                navigator("/asdg");
        };

        checkAdmin()
        let devicesData = await GetUnassignedDevices();
        setDevices(devicesData); 

        
        devicesData = await GetDevicesByUserId(+id);
        setUserDevices(devicesData); 
    };


    useEffect(() => {
        featchData(); 
    }, []); 

    return (
        <div className="admin-user-devices">
            <div className='header'>
                <BackToAdminBtn/>
                <div className="asfd"></div>
            </div>
            <div className="device-lists">
                <ListDevice devices={userDevices} haveRemoveForAdmin={true} userId={+id} updateFunction={featchData}/>
                <ListDevice devices={devices} haveAddForAdmin={true} userId={+id} updateFunction={featchData} />
            </div>
        </div>
    );
}

export default AdminUserDevices