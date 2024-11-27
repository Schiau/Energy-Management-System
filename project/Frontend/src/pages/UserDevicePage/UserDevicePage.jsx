import { useState, useEffect } from "react";
import BackToUserPageBtn from "../../components/BackToUserPageBtn/BackToUserPageBtn";
import Calendar from "../../components/Calendar/Calendar";
import EnergyBarChart from "../../components/EnergyBarChart/EnergyBarChart";
import './UserDevicePage.css';
import { useParams } from "react-router-dom";
import { GetDeviceById } from '../../services/ServiceDevice';
import useDeviceWebSocket from '../../services/useDeviceWebSocket';


function UserDevicePage() {
    const [currentDevice, setDevice] = useState(null);
    const [currentDate, setDate] = useState(new Date().toLocaleDateString('en-GB'));
    const { idDevice } = useParams();

    const {isConnected, messages, newMessage, sendMeasurement } = useDeviceWebSocket();

    useEffect(() => {
        const fetchDevices = async () => {
            const devicesData = await GetDeviceById(idDevice);
            setDevice(devicesData);
        };
        fetchDevices();
    }, [idDevice])

    useEffect(() => {
        let parts = currentDate.split("/");
        console.log(parts);
        let jsDate = new Date(parts[2], parts[1]-1, parts[0]);
        console.log(jsDate)
        const measurementDto = {
            idDevice: idDevice,
            date: jsDate,
        };
        if(isConnected) sendMeasurement(measurementDto);
        
    }, [isConnected,currentDate,newMessage]);

    return (
        <div className="user-device-page">
            {currentDate && <p className="selected-date">Selected date: {currentDate}</p>}
            <div className="container">
                <div className="calendar">
                    <Calendar setDate={setDate} />
                </div>
                <div className="energy-chart">
                    <EnergyBarChart data={messages} maxEnergy={currentDevice?.energyConsumption || 0} />
                </div>
            </div>
            <div className="back-btn">
                <BackToUserPageBtn />
            </div>
        </div>
    );
}

export default UserDevicePage;
