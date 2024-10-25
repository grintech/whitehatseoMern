import { useEffect, useRef } from 'react';

const useIdleTimer = (timeout, onTimeout) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onTimeout, timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    const eventHandler = () => resetTimer();

    events.forEach(event => window.addEventListener(event, eventHandler));

    resetTimer(); // Initialize timer

    return () => {
      events.forEach(event => window.removeEventListener(event, eventHandler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout, onTimeout]);

  return resetTimer;
};

export default useIdleTimer;
