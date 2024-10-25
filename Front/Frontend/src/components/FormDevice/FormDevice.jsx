import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FormDevice.css';

function FormDevice({ initialDevice = {}, onSubmit }) {
    const [device, setDevice] = useState({
        id: "",
        name: "",
        location: "",
        energyConsumption: "",
        description: ""
    });

    useEffect(() => {
        if (Object.keys(initialDevice).length > 0) {
            setDevice(initialDevice);
        }
    }, [initialDevice]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(device); 
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDevice((prevDevice) => ({
            ...prevDevice,
            [id]: value
        }));
    };

    const handleEnergy = (e) =>{
        const { id, value } = e.target;
        setDevice((prevDevice) => ({
            ...prevDevice,
            [id]: +value
        }));
    }

    return (
        <form onSubmit={handleSubmit} className='form-dev'>
            <div>
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    id="name" 
                    value={device.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <br />
            <div>
                <label htmlFor="location">Location: </label>
                <input 
                    type="text" 
                    id="location" 
                    value={device.location} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <br />
            <div>
                <label htmlFor="energyConsumption">Energy Consumption (W): </label>
                <input 
                    type="number" 
                    id="energyConsumption" 
                    value={device.energyConsumption} 
                    onChange={handleEnergy} 
                    required 
                />
            </div>
            <br />
            <div>
                <label htmlFor="description">Description: </label>
                <textarea 
                    id="description" 
                    value={device.description} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <br />
            <button type="submit">{Object.keys(initialDevice).length > 0 ? 'Update' : 'Submit'}</button>
        </form>
    );
}

FormDevice.propTypes = {
    initialDevice: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        location: PropTypes.string,
        energyConsumption: PropTypes.string,
        description: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
};

export default FormDevice;
