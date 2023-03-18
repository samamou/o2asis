const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
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
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


