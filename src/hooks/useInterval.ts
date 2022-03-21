import React, { useEffect, useRef } from 'react';

const useInterval = (callback: Function, delay: number, onMounted: boolean) => {
  const savedCallback: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!onMounted) return;
    function executeCallbackOnMount() {
      savedCallback.current();
    };
    executeCallbackOnMount();
  }, [onMounted]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;