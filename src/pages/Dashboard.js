import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PlantRoom.css';
import P5 from 'react-p5';
import SensorDataSketch from '../components/SensorDataSketch';

function Dashboard() {
  const [sensorData, setSensorData] = useState(null);
  const backendBaseURL = 'http://localhost:3000';

  const fetchData = () => {
    axios
      .get(`${backendBaseURL}/api/sensorData`)
      .then((response) => {
        console.log(response.data);
        // Set sensorData directly to the response data
        setSensorData(response.data);
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
        <h1 className="plant-room__title">Air Quality Dashboard</h1>
        {sensorData && (
          <div className="sensor-data">
            {Object.entries(sensorData)
              .filter(([key, value]) => value > 0 ) // Filter out sensor values that are -1
              .map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
          </div>
        )}

        <div className="p5-container">
          {sensorData && <SensorDataSketch sensorData={sensorData} />}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
