
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EnergyBarChart = ({ data, maxEnergy }) => {
  const hours24 = Array.from({ length: 24 }, (_, i) => ({
    hour: i.toString().padStart(2, '0') + ':00',
    energy: 0,
  }));

  data.forEach(({ hour, energy }) => {
    const index = hours24.findIndex(item => item.hour === hour);
    if (index !== -1) {
      hours24[index].energy = energy;
    }
  });

  const chartData = {
    labels: hours24.map(item => item.hour),
    datasets: [
      {
        label: 'Energy Consumption',
        data: hours24.map(item => item.energy),
        backgroundColor: hours24.map(item => 
            item.energy > maxEnergy ? 'red' : 'rgba(75, 192, 192, 0.6)'
          ),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Energy Consumption per Hour',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxEnergy,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

EnergyBarChart.propTypes = {
    maxEnergy: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        hour: PropTypes.string.isRequired,
        energy: PropTypes.number.isRequired
      })
    ).isRequired
  };

export default EnergyBarChart;
