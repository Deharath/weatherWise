import React from 'react';
import './App.css';

const App = () => {
  const location = 'San Francisco, USA';
  const currentTemperature = 72;
  const weatherDescription = 'Sunny';
  const humidity = '45%';
  const windSpeed = '5 mph';
  const windDirection = 'SW';
  const feelsLikeTemperature: number = 70;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="current-weather bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{location}</h1>
        <div className="flex items-center justify-start mb-4">
          <span className="text-6xl font-bold mr-4">{currentTemperature}°</span>
          <span className="material-symbols-outlined">
            sunny
          </span>
        </div>
        <p className="text-xl mb-4">{weatherDescription}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Humidity</p>
            <p>{humidity}</p>
          </div>
          <div>
            <p className="font-bold">Wind</p>
            <p>{windSpeed} {windDirection}</p>
          </div>
          <div>
            <p className="font-bold">Feels Like</p>
            <p>{feelsLikeTemperature}°</p>
          </div>
        </div>
      </div>
      <HourlyForecast/>
    </div>
  );
};

const HourlyForecast = () => {
  // Replace these placeholders with real data from your API
  const hourlyData = [
    { time: '1 PM', icon: 'https://path-to-your-weather-icon/image.png', temperature: 70, precipitation: 0 },
    { time: '2 PM', icon: 'https://path-to-your-weather-icon/image.png', temperature: 72, precipitation: 5 },
    { time: '3 PM', icon: 'https://path-to-your-weather-icon/image.png', temperature: 73, precipitation: 10 },
    // Add more data points as needed
  ];

  return (
    <div className="hourly-forecast mt-8">
      <h2 className="text-2xl font-bold mb-4">Hourly Forecast</h2>
      <div className="flex overflow-x-scroll">
        {hourlyData.map((data, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mr-4">
            <p className="font-bold">{data.time}</p>
            <img src={data.icon} alt="Weather Icon" className="w-12 h-12 mx-auto my-2" />
            <p>{data.temperature}°</p>
            <p>{data.precipitation}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default App;
