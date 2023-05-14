const axios = require('axios');

exports.handler = async function(event) {
  const { city } = event.queryStringParameters;
  const encodedCity = encodeURIComponent(city);
  const API_KEY = process.env.NEEDED_API_KEY;
  console.log('API_KEY: ', API_KEY);
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedCity}&key=${API_KEY}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch geocode data' }),
    };
  }
}