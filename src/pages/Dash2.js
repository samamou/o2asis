import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PlantRoom.css';

function Dash2() {
  const [sensorData, setSensorData] = useState(null);
  const backendBaseURL = 'http://localhost:3000';

  const fetchData = () => {
    axios
      .get(`${backendBaseURL}/api/sensorData`)
      .then((response) => {
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

  const getSuggestions = () => {
    if (!sensorData) return [];

    const suggestions = [];
    if (sensorData.gbHum < 30) {
      suggestions.push('Consider using a humidifier to increase indoor humidity levels.');
    }
    if (sensorData.gbHum > 60) {
      suggestions.push('Consider using a dehumidifier to decrease indoor humidity levels.');
    }
    if (sensorData.gbTemp > 24) {
      suggestions.push('Consider using an air conditioner or fan to cool down the room.');
    }
    // Add more suggestions based on sensor readings
    return suggestions;
  };

  return (
    <div className="plant-room">
      <div className="plant-room__content">
        <h1 className="plant-room__title">Air Quality Dashboard</h1>
        {sensorData && (
          <div className="sensor-data">
            {Object.entries(sensorData)
              .filter(([key, value]) => value !== -1 && value !== -127)
              .map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
          </div>
        )}
        <div className="resources">
          <h1>Suggestions to Improve Air Quality</h1>
          {getSuggestions().map((suggestion, index) => (
            <p key={index}>{suggestion}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dash2;
