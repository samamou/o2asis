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

//RETRIEVE DATA get request 
// app.get('/api/sensorData', async (req, res) => {
//   try {
//     const kitId = 1011;
//     const sensorName = 'Air';
//     const response = await axios.get(
//       `https://kits.teleagriculture.org/api/kits/${kitId}/${sensorName}/measurements?api_key=${apiKey}`
//     );
//     console.log(response.data);
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

app.get('/api/sensorData', async (req, res) => {
  try {
    const kitId = 1011;
    const response = await axios.get(
      `https://kits.teleagriculture.org/api/kits/${kitId}/measurements?api_key=${apiKey}`
    );
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
