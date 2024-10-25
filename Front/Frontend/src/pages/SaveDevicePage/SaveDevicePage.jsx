import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormDevice from '../../components/FormDevice/FormDevice';
import {  GetDeviceById, Update, addNew } from '../../services/ServiceDevice';
import { useNavigate } from 'react-router-dom';
import './SaveDevicePage.css'

function SaveDevicePage() {
    const { id } = useParams(); 
    const deviceId = +id;
    const [device, setDevice] = useState(null); 
    const navigator = useNavigate();
    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                const fetchedUser = await GetDeviceById(+deviceId);
                setDevice(fetchedUser); 
            };
            fetchUser();
        }
    }, [device, deviceId, id]);

    return (
        <>
            {device ? (
                <div className='save-device-page'>
                <h2 >Update device</h2>
                <FormDevice 
                    initialDevice={device} 
                    onSubmit={(device) => {
                        navigator("/admin") 
                        Update(device, deviceId)
                    }} 
                />
                </div>
                
            ) : (
                <div className='save-device-page'>
                <h2>Add new device</h2>
                <FormDevice onSubmit={(device) => {
                    addNew(device)
                    navigator("/admin")
                }} />
                 </div>
            )}
        </>
    );
}

export default SaveDevicePage;
