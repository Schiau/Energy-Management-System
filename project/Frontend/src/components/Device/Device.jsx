import PropTypes from 'prop-types';
import './Device.css'

function Device({location = 'Unknown', energyConsumption = 0, description ='No description available'}) {
    return (
      <div className='device-card'>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Energy Consumption:</strong> {energyConsumption} kWh</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
    );
  }

Device.propTypes ={
    location: PropTypes.string,
    energyConsumption: PropTypes.number,
    description: PropTypes.string
}

export default Device