import React, { useState, useEffect } from 'react';

export default function CountUpAnimation({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const timePassed = Date.now() - startTime;
      const progress = Math.min(timePassed / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span className="d-inline-block">
      {count}{suffix}
    </span>
  );
}