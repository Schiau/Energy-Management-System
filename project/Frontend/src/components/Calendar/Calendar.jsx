import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './Calendar.css';

const Calendar = ({setDate = null}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        const daysInMonth = [];
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            daysInMonth.push(i);
        }

        const daysToFill = firstDayOfMonth.getDay();
        for (let i = 0; i < daysToFill; i++) {
            daysInMonth.unshift(null);
        }
        
        setDays(daysInMonth);
    }, [currentDate]);

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null); 
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const handleSelectDate = (day) => {
        if (day) {
            const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            setSelectedDate(newSelectedDate);
            setDate(newSelectedDate.toLocaleDateString('en-GB'));
        }
    };
    

    return (
        <div className="calendar">
            <header>
                <button onClick={handlePreviousMonth}>Previous</button>
                <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </header>
            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="day-header">{day}</div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`day ${day ? '' : 'empty'} ${selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() ? 'selected' : ''}`}
                        onClick={() => handleSelectDate(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

Calendar.propTypes ={
    setDate: PropTypes.func
}

export default Calendar;
