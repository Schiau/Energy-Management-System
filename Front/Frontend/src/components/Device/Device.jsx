import PropTypes from 'prop-types';
import './Device.css'

function Device({ name = "Device", location = 'Unknown', energyConsumption = 0, description ='No description available'}) {
    return (
      <div className='device-card'>
        <h2>{name}</h2>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Energy Consumption:</strong> {energyConsumption} kWh</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
    );
  }

Device.propTypes ={
    name: PropTypes.string,
    location: PropTypes.string,
    energyConsumption: PropTypes.string,
    description: PropTypes.string
}

export default Device