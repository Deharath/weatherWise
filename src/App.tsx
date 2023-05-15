import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <MainContainer />
    </>
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
      console.log(locationData)

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
    <header className="p-6 mb-8 ">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">Weather App</h1>
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

const MainContainer = () => {
  return (

    <div className="flex flex-col items-center min-h-screen bg-gray-100 ">
      <Header />
      <div className="flex flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white p-4 rounded shadow-lg w-4/5">
        <div className="flex flex-col space-y-4 w-4/5">
          <div className="flex flex-col space-y-2">
            <h1 className="font-bold text-2xl">City Name</h1>
            <p>Chance of Rain: 30%</p>
            Weather Icon
            <p>Current Temperature: 20&deg;C</p>
          </div>
          <div className="flex flex-row space-x-2 justify-around">
            <div className="flex flex-col items-center space-y-2 w-1/5">
              <p>1 am</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/5">
              <p>1 am</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/5">
              <p>1 am</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/5">
              <p>1 am</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/5">
              <p>1 am</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/5">
              <p>1 am</p>
              Weather Icon
              <p>Temperature</p>
            </div>
          </div>
          <div className="flex flex-row space-x-4 justify-around">
            <div>
              <p>Feeling Temperature: 20&deg;C</p>
            </div>
            <div>
              <p>Wind Speed: 10km/h</p>
            </div>
            <div>
              <p>Chance of Rain: 30%</p>
            </div>
            <div>
              <p>Pressure: 1013hPa</p>
            </div>
          </div>

        </div>
        <div className='flex-col h-full flex justify-center'>
          <div className="flex flex-row items-center justify-around space-y-2 w-full">
            <p>1 am</p>
            Weather Icon
            <p>Temperature</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default App;

