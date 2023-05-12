import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  return (
    <Header />
  );
};

const Header = () => {
  const [city, setCity] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const encodedCity = encodeURIComponent(city);
      const response = await axios.get(`/.netlify/functions/geocode?city=${encodedCity}`);
      const locationData = response.data;

      if (locationData.results && locationData.results.length > 0) {
        const lat = locationData.results[0].geometry.location.lat;
        const lng = locationData.results[0].geometry.location.lng;

        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        // Use lat and lng for further processing
      } else {
        console.log('No results found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-white p-6 mb-8">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by city"
          value={city}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>
    </header>
  );
};

export default App;

