import React, { useEffect, useRef } from 'react';
import Fireworks from 'react-fireworks';

const FireworksComponent = () => {
  const fireworksRef = useRef(null);

  useEffect(() => {
    const fireworks = fireworksRef.current;
    fireworks.start();

    // Tắt hiệu ứng sau 5 giây
    setTimeout(() => {
      fireworks.stop();
    }, 5000);
  }, []);

  return <Fireworks ref={fireworksRef} />;
};

export default FireworksComponent;
