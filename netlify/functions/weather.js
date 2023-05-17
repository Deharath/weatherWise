const axios = require('axios');

exports.handler = async function(event) {
  const { lat, lon } = event.queryStringParameters;
  const API_KEY = process.env.WEATHER_API_KEY; 
   
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
}
