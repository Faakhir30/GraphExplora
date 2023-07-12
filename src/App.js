import React, { useEffect, useState } from 'react';
import './App.css';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';

function App() {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
      setDeviceHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <PathfindingVisualizer width={deviceWidth} height={deviceHeight} />
    </div>
  );
}

export default App;
