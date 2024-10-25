import { useState, useEffect } from 'react'
import UserList from '../../components/UsersList/UserList'
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn'
import {GetAll as GetAllUsers, getRollFromToken}  from '../../services/ServiceUser'
import {GetAll as GetAllDevices} from '../../services/ServiceDevice'
import './AdminPage.css'
import { useNavigate } from 'react-router-dom'
import AdminDeviceList from '../../components/AdminDeviceList/AdminDeviceList'

function AdminPage()
{
    const [devices, setDevices] = useState([]); 
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    const fetchUsers = async () => {
        const usersData = await GetAllUsers();
        setUsers(usersData); 
    };

    const fetchDevices = async () => {
        const devicesData = await GetAllDevices();
        setDevices(devicesData); 
    };

    useEffect(() => {
        const checkAdmin = async () => {
            //asta trebuie sa primeasca tolenul
            const role = await getRollFromToken("ADMIN");
            console.log("aici admin")
            if (role !== "ADMIN") {
                navigate("/safdasfsa");
            }
        };

        checkAdmin();
    },[navigate]);

    useEffect(() => {
        fetchUsers(); 
        fetchDevices(); 
    },[]);


    return (
        <div className="admin-page-container">
            <h1>Hello Admin</h1>
            <div className="admin-content">
                <UserList users={users} updateFunction={fetchUsers}/>
                <div className='right-colom'>
                    <AdminDeviceList devices={devices} updateFunction={fetchDevices}/>
                    <div className='buttons'>
                        <LogOutBtn/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage