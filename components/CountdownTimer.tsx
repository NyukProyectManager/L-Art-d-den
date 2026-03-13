import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDays?: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDays = 6 }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: targetDays,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Check if we have a saved end time
    const savedEndTime = localStorage.getItem('countdownEndTime');
    const endTime = savedEndTime ? new Date(savedEndTime) : new Date(Date.now() + targetDays * 24 * 60 * 60 * 1000);
    
    // Save the end time if not exists
    if (!savedEndTime) {
      localStorage.setItem('countdownEndTime', endTime.toISOString());
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        // Reset countdown when it expires
        const newEndTime = new Date(Date.now() + targetDays * 24 * 60 * 60 * 1000);
        localStorage.setItem('countdownEndTime', newEndTime.toISOString());
        
        const days = targetDays;
        const hours = 0;
        const minutes = 0;
        const seconds = 0;
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDays]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <span className="font-bold">
      {timeLeft.days} días {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
    </span>
  );
};
