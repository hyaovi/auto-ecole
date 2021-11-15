import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay = 1000) => {
  const callbackRef = useRef();
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      callbackRef.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
