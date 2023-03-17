import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

function PlantRoom() {
  const [sensorData, setSensorData] = useState(null);

  //listens for changes, fetch data from papi 
  useEffect(() => {
    axios
      .get('/api/sensorData')
      .then((response) => {
        console.log(response.data);
        setSensorData(response.data.data[0].measurements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="plant-room-background">
      <Header />

      <div className="plant-room">
        <h1 className="plant-room__title">Plant Room</h1>
        {sensorData && (
          <div className="sensor-data">
            <p>Temperature: {sensorData.temperature} °C</p>
            <p>Humidity: {sensorData.humidity} %</p>
            <p>Light Level: {sensorData.light_level} lumens</p>
            <p>Soil Moisture: {sensorData.soil_moisture} %</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


export default PlantRoom;
