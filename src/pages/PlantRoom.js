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
  const backendBaseURL = 'http://localhost:3000';

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
    <div className="plant-room-background">
      <Header />

      <div className="plant-room">
        <h1 className="plant-room__title">Plant Room</h1>
        {sensorData && (
          <div className="sensor-data">
            {Object.keys(sensorData).map((key) => (
              <p key={key}>
                {key}: {sensorData[key]}
              </p>
            ))}
          </div>
        )}

        {/* Add a graph or chart that shows historical data */}



          {/* Replace the div with a beautiful p5 sketch that visualizes the data */}
          <div className="p5-sketch">
            {sensorData && <SensorDataSketch sensorData={sensorData} />}
        


        </div>

        <div className="historical-data">
          <h2>Historical Data</h2>
          {/* Replace this div with a chart or graph from a library like Chart.js */}

          <div className="chart-placeholder">Chart goes here</div>
        </div>

        {/* Section that offers resources and tips for reducing indoor air pollution */}
        <div className="resources">
          <h2>Resources & Tips for Reducing Indoor Air Pollution</h2>
          {/* Add articles, videos, or infographics here */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PlantRoom;
