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
    <div className="flex flex-row w-4/6 p-3">
      <input
        type="text"
        placeholder="Search by city"
        value={city}
        onChange={handleInputChange}
        className="border-2 border-gray-300 rounded p-2 mr-2 w-4/5"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded w-1/5">Search</button>
    </div>

  );
};

const MainContainer = () => {
  return (

    <div className="flex flex-col items-center h-full justify-center">
      <div className="flex flex-col bg-white p-4 rounded shadow-lg h-3/4 w-3/4">
        <Header />
        <div className='flex flex-row p-3 h-full'>
          <div className="flex flex-col space-y-8 w-4/6">

            <div className="flex flex-col space-y-2 h-1/3">
              <h1 className="font-bold text-2xl ">City Name</h1>
              <p>Chance of Rain: 30%</p>
              Weather Icon
              <p>Current Temperature: 20&deg;C</p>
            </div>

            <div className="flex flex-row justify-around items-center rounded-lg p-3 bg-teal-400 h-1/3">
              Today's forecast
              <div className="flex flex-col items-center space-y-2  p-2 w-1/5 text-center">
                <p>1 am</p>
                Weather Icon
                <p>20&deg;C</p>
              </div>
              <div className="flex flex-col items-center space-y-2  p-2 w-1/5 border-l-2 text-center">
                <p>1 am</p>
                Weather Icon
                <p>20&deg;C</p>
              </div>
              <div className="flex flex-col items-center space-y-2  p-2 w-1/5 border-l-2 text-center">
                <p>1 am</p>
                Weather Icon
                <p>20&deg;C</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-2 w-1/5 border-l-2 text-center">
                <p>1 am</p>
                Weather Icon
                <p>20&deg;C</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-2 w-1/5 border-l-2 text-center">
                <p>1 am</p>
                Weather Icon
                <p>20&deg;C</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-2 w-1/5 border-l-2 text-center">
                <p>1 am</p>
                Weather Icon
                <p>20&deg;C</p>
              </div>
            </div>

            <div className="flex flex-col space-x-4 justify-around items-center rounded-lg p-3 bg-teal-400 h-1/3">
              <div className='flex flex-row w-full'>
                <div className='w-1/2 flex'>
                  <p>Feeling Temperature: 20&deg;C</p>
                </div>
                <div className='w-1/2 flex'>
                  <p>Wind Speed: 10km/h</p>
                </div>
              </div>
              <div className='flex flex-row w-full'>
                <div className='w-1/2 flex'>
                  <p>Chance of Rain: 30%</p>
                </div>
                <div className='w-1/2 flex'>
                  <p>Pressure: 1013hPa</p>
                </div>
              </div>
            </div>

          </div>
          <div className='flex-col h-full flex justify-evenly w-2/6 ml-3'>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
            <div className="flex flex-row items-center justify-around w-full">
              <p>Saturday</p>
              Weather Icon
              <p>Temperature</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default App;

