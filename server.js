const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(cors({
  origin: '*',
}));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Get kit info including the latest measurement per sensor
app.get('/api/sensorData', async (req, res) => {
  try {
    const kitId = 1011;
    const response = await axios.get(`https://kits.teleagriculture.org/api/kits/${kitId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    console.log(response.data);
    const latestData = response.data.data.sensors.reduce((acc, sensor) => {
      acc[sensor.name] = sensor.latest_measurement?.value;
      return acc;
    }, {});
    res.send(latestData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
