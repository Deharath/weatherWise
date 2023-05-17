import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { WeatherData } from './additional/weatherData.interface';

const App: React.FC = () => {


  const [input, setInput] = useState('');
  const [city, setCity] = useState('');
  const [data, setData] = useState<WeatherData | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const encodedInput = encodeURIComponent(input);
      const geocodeResponse = await axios.get(`/.netlify/functions/geocode?city=${encodedInput}`);
      const locationData = geocodeResponse.data;

      if (locationData.results && locationData.results.length > 0) {
        const lat = locationData.results[0].geometry.location.lat;
        const lng = locationData.results[0].geometry.location.lng;
        const weatherResponse = await axios.get(`/.netlify/functions/weather?lat=${lat}&lon=${lng}`);
        setCity(locationData.results[0].formatted_address)
        setData(weatherResponse.data);
        console.log(weatherResponse.data.hourly[1])

      } else {
        console.log('No results found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  function hourlyForecast() {
    const hourlyData = [];
    for (let i = 1; i < 7; i++) {
      hourlyData.push(data?.hourly[i])
    }
  }


  return (
    <div className="flex flex-col items-center h-full justify-center bg-gradient-to-tr from-blue-900 via-blue-600 to-blue-400 font-sans">
      <div className="flex flex-col bg-gray-800 p-4 rounded shadow-lg h-3/4 w-3/4 opacity-95">
        <div className='flex flex-row p-3 h-full text-white'>
          <div className="flex flex-col space-y-3 w-4/6">

            <div className="flex flex-row w-4/6 p-3 text-black">
              <input
                type="text"
                placeholder="Search by city"
                value={input}
                onChange={handleInputChange}
                className="border-2 border-gray-300 rounded p-2 mr-2 w-4/5"
              />
              <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded w-1/5">Search</button>
            </div>

            <div className="flex flex-row space-y-2 h-1/3 p-3 justify-between">
              <div className='flex flex-col'>
                <h1 className="font-bold text-2xl mb-3">{city}</h1>
                <p>Humidity: {data?.current.humidity}%</p>
                <p>Current Temperature: {`${data?.current && data.current.temp.toFixed(0)}\u00B0C`} </p>
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${data?.current.weather[0].icon}.png`}
                alt={data?.current.weather[0].description}
                className='h-1/2'
              />
            </div>

            <div className="flex flex-col rounded-lg p-3 bg-gray-600 h-1/3">
              <h2 className='mb-2 font-semibold'>Today's forecast</h2>
              <div className='flex flex-row justify-around items-center'>
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
            </div>

            <div className="flex flex-col space-x-4 justify-around items-center rounded-lg p-3 bg-gray-600 h-1/3">
              <div className='self-start flex'><h2 className='mb-2 font-semibold'>Air Conditions</h2></div>
              <div className='flex flex-row w-full'>
                <div className='w-1/2 flex flex-col'>
                  <p>Feels like</p>
                  <p className=' font-semibold text-xl'>{`${data?.current.feels_like.toFixed(0)}\u00B0C`}</p>
                </div>
                <div className='w-1/2 flex flex-col'>
                  <p>Wind Speed</p>
                  <p className=' font-semibold text-xl'>{`${data?.current.wind_speed.toFixed(1)} km/h`}</p>
                </div>
              </div>
              <div className='flex flex-row w-full'>
                <div className='w-1/2 flex flex-col'>
                  <p>Chance of Rain</p>
                  <p className=' font-semibold text-xl'>30%</p>
                </div>
                <div className='w-1/2 flex flex-col'>
                  <p>Pressure</p>
                  <p className=' font-semibold text-xl'>{`${data?.current.pressure}hPa`}</p>
                </div>
              </div>
            </div>

          </div>
          <div className='flex-col h-full flex  w-2/6 ml-3 rounded-lg p-3 bg-gray-600'>
            <h2 className='font-semibold'>7 Day Forecast</h2>
            <div className='flex flex-col space-y-2 justify-around h-full'>
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
    </div>
  );
};


export default App;

