import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByToken} from '../../services/ServiceUser'
import ListDevice from '../../components/DevicesList/ListDevices'
import { GetUnassignedDevices, GetDevicesByUserId } from '../../services/ServiceDevice';
import BackToAdminBtn from '../../components/BackToAdminBtn/BackToAdminBtn'
import './AdminUserDevices.css'

function AdminUserDevices()
{
    const { id } = useParams(); 
    const[text, setText] = useState("")
    const[userDevices, setUserDevices] = useState([])
    const[devices, setDevices] = useState([])
    const navigate = useNavigate()

    const featchData = async () => {
        let devicesData = await GetUnassignedDevices();
        setDevices(devicesData); 

        
        devicesData = await GetDevicesByUserId(+id);
        setUserDevices(devicesData); 
    };


    useEffect(() => {
        featchData(); 
    }, []); 

    useEffect(() => {
        const checkAdmin = async () => {
            //asta trebuie sa primeasca tolenul
            if(!localStorage.getItem("token"))
            {
                navigate("/");
                return;
            }
            const token = localStorage.getItem("token");
            const user = await getUserByToken(token);
            if (user.role !== "ADMIN") {
                navigate("/asdg");
            }
            setText(user.firstName + " " + user.lastName )
        };

        checkAdmin();
    },[navigate]);

    return (
        <div className="admin-user-devices">
            <div className='header'>
                <BackToAdminBtn/>
                <h2 className="page-title">User Devices for {text}</h2>
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