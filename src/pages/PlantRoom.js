import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/PlantRoom.css';
// import { ReactP5Wrapper as P5Wrapper } from 'react-p5-wrapper'; // Corrected import statement
import P5 from 'react-p5';

import SensorDataSketch from '../components/SensorDataSketch';  


function PlantRoom() {
  const [sensorData, setSensorData] = useState(null);
  const backendBaseURL = 'http://localhost:3000'; //add this as an env variable. 

  const fetchData = () => {
    axios
      .get(`${backendBaseURL}/api/sensorData`)
      .then((response) => {
        console.log(response.data);
        const latestData = response.data.data.sensors.reduce((acc, sensor) => {
          acc[sensor.name] = sensor.latest_measurement?.value;
          return acc;
        }, {});
        setSensorData(latestData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="plant-room">

        <div className="plant-room__content">
          <h1 className="plant-room__title"> </h1>
          {sensorData && (
            <div className="sensor-data">
              {Object.keys(sensorData).map((key) => (
                <p key={key}>
                  {key}: {sensorData[key]}
                </p>
              ))}
            </div>
          )}
          
      
          <div className="p5-container">
            {/* <h2>Historical Data</h2> */}
          
          
                    
              {/* div that holds my p5 sketch that visualizes the data :) */}
            
                {sensorData && <SensorDataSketch sensorData={sensorData} />}
            
            
            
          </div>

          <div className="resources">
          </div>
        </div>

        <Footer />
      </div>
      
  );
}

export default PlantRoom;
