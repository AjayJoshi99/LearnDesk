import React, { useState, useEffect } from 'react';
import moment from 'moment'; 

//here onTimeUp  is props passed in Exam.js
const Timer = ({ onTimeUp }) => {
  const [time, setTime] = useState(900); 

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(time => time - 1);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
    }
  }, [time, onTimeUp]);

  const formattedTime = moment.utc(time * 1000).format('mm:ss');

  return (
    <div>
      <p>Time Remaining: {formattedTime}</p>
    </div>
  );
};

export default Timer;
