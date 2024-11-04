import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Add leading zeros
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    return {
      hours,
      minutes: formattedMinutes,
      seconds: formattedSeconds,
      ampm
    };
  };

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                   'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Add appropriate suffix to day number
    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${dayName}, ${monthName} ${day}${getDaySuffix(day)}, ${year}`;
  };

  const { hours, minutes, seconds, ampm } = formatTime(time);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white font-sans text-center">
        <div className="flex items-baseline justify-center">
          <span className="text-8xl font-light tracking-tight">
            {hours}:{minutes}
          </span>
          <span className="text-4xl ml-2 font-light">
            :{seconds}
          </span>
          <span className="text-2xl ml-2 font-light">
            {ampm}
          </span>
        </div>
        <div className="text-xl font-light mt-4 text-gray-300">
          {formatDate(time)}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;