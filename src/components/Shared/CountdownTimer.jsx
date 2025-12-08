import React, { useState, useEffect } from "react";
import { parse, intervalToDuration, isPast } from "date-fns";
import { FaExclamationTriangle } from "react-icons/fa";

const CountdownTimer = ({ date, time, size = "lg" }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!date || !time) return;
    const dateString = `${date} ${time}`;
    const targetDate = parse(dateString, 'yyyy-MM-dd hh:mm a', new Date());

    const updateTimer = () => {
      if (isPast(targetDate)) {
        setTimeLeft("Expired");
      } else {
        const duration = intervalToDuration({
          start: new Date(),
          end: targetDate,
        });
        setTimeLeft(duration);
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000); 
    return () => clearInterval(timerId);
  }, [date, time]);

  if (timeLeft === "Expired") {
    return (
      <div className={`inline-flex items-center gap-1 text-error font-bold bg-red-50 rounded-md border border-red-100 ${size === 'sm' ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'}`}>
        <FaExclamationTriangle /> Departed
      </div>
    );
  }

  if (!timeLeft) return <span className="loading loading-dots loading-xs text-primary"></span>;

  // Configuration based on size prop
  const styles = size === "sm" ? {
    gap: "gap-2",
    box: "w-10 h-10 rounded-lg",
    text: "text-sm",
    label: "text-[8px]"
  } : {
    gap: "gap-3 sm:gap-4",
    box: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
    text: "text-2xl sm:text-3xl",
    label: "text-[10px]"
  };

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className={`${styles.box} flex items-center justify-center bg-base-100 shadow-sm border border-base-200`}>
        <span className={`font-mono ${styles.text} font-black text-gray-800`}>
           {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className={`${styles.label} uppercase font-bold text-gray-400 mt-1 tracking-wider`}>{label}</span>
    </div>
  );

  return (
    <div className={`flex ${styles.gap}`}>
      <TimeBlock value={timeLeft.days || 0} label="Day" />
      <TimeBlock value={timeLeft.hours || 0} label="Hr" />
      <TimeBlock value={timeLeft.minutes || 0} label="Min" />
      <TimeBlock value={timeLeft.seconds || 0} label="Sec" />
    </div>
  );
};

export default CountdownTimer;