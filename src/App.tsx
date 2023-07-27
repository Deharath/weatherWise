import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { WeatherData } from "./additional/weatherData.interface";

const App: React.FC = () => {

  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const encodedInput = encodeURIComponent(input);
      const geocodeResponse = await axios.get(`/.netlify/functions/geocode?city=${encodedInput}`);
      const locationData = geocodeResponse.data;

      if (locationData.results && locationData.results.length > 0) {
        setLoading(true);
        const lat = locationData.results[0].geometry.location.lat;
        const lng = locationData.results[0].geometry.location.lng;
        const weatherResponse = await axios.get(`/.netlify/functions/weather?lat=${lat}&lon=${lng}`);
        setCity(locationData.results[0].formatted_address)
        setData(weatherResponse.data);
        setLoading(false);
      } else {
        console.log("No results found");
        setInput("No results found");
        setTimeout(() => {
          setInput("");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  type DateTimeFormat = "hour" | "day";

  function getDateTimeFromUnix(unix: number, offset: number, format: DateTimeFormat) {
    // convert unix timestamp and offset from seconds to milliseconds
    const unixMilliseconds = unix * 1000;
    const offsetMilliseconds = offset * 1000;

    // create a Date object using the adjusted timestamp
    const date = new Date(unixMilliseconds + offsetMilliseconds);

    // convert the date to a string in the UTC timezone
    const utcString = date.toISOString();

    // parse the UTC string back into a Date object
    const adjustedDate = new Date(utcString);

    // format the adjusted Date object
    if (format === "hour") {
      return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(adjustedDate);
    } else if (format === "day") {
      return new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" }).format(adjustedDate);
    }
  }


  const HourlyForecast: React.FC<{ data: WeatherData | null }> = ({ data }) => {
    if (!data) return null;
    return (
      <>
        {data.hourly.slice(1, 6).map((hour) => (
          <div key={hour.dt} className="flex flex-col items-center space-y-2 p-2 w-1/5 text-center border-r-2 border-gray-200 last:border-r-0 mb-3">
            <p>{getDateTimeFromUnix(hour.dt, data.timezone_offset, "hour")}</p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
              className="h-1/2"
            />
            <p>{`${hour.temp.toFixed(0)}\u00B0C`}</p>
          </div>
        ))}
      </>
    );
  };

  const DailyForecast: React.FC<{ data: WeatherData | null }> = ({ data }) => {
    if (!data) return null;
    return (
      <>
        {data.daily.slice(1, 9).map((day) => (
          <div key={day.dt} className="flex flex-row items-center justify-evenly">
            <p className="w-1/2 self-center">{getDateTimeFromUnix(day.dt, data.timezone_offset, "day")}</p>
            <p className="w-1/5 font-semibold text-lg">{`${day.temp.day.toFixed(0)}\u00B0C`}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="object-scale-down"
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center h-full justify-center bg-gradient-to-tr from-blue-900 via-blue-600 to-blue-400 font-sans p-5 overflow-hidden">
      <h1 className=" font-bold text-5xl mb-5 text-white">WeatherWise</h1>
      <div className={`flex flex-col bg-gray-800 rounded shadow-lg bg-opacity-70 overflow-hidden ${data != null && "md:w-full"} max-w-4xl md:p-5 p-4 shadow shadow-gray-800`}>
        <div className="flex md:flex-row flex-col h-full text-white">
          <div className={`flex flex-col space-y-3 w-full h-full ${data != null && "md:mr-3"}`}>
            <div className="flex flex-row w-full text-black">
              <div className="relative w-full flex">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                    </path>
                  </svg>
                </div>
                <input
                  type="search"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter city name" />
                <button onClick={handleSearch} className="flex justify-center items-center w-3/12 md:w-1/5 text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {!loading ?
                    ("Search")
                    :
                    (
                      <svg aria-hidden="true" className="h-5 w-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                    )}
                </button>
              </div>
            </div>
            <div className={`flex flex-row p-3 ${data !== null ?  "justify-between" : "justify-center"}`}>
              {data !== null ? (
                <>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-2xl mb-3">{city}</h1>
                    <p>Humidity: {data?.current.humidity}%</p>
                    <p>Current Temperature: {`${data?.current && data.current.temp.toFixed(0)}\u00B0C`} </p>
                  </div>
                  <img
                    src={`http://openweathermap.org/img/wn/${data?.current.weather[0].icon}.png`}
                    alt={data?.current.weather[0].description}
                    className="  object-cover"
                  />
                </>):(
              <div className="flex flex-col justify-center">
                <div className="text-lg mb-3 text-left space-y-2"><p><p>Welcome to WeatherWise, your personal weather station.</p> <p>Discover current conditions, see hourly trends, and plan your week with a seven-day forecast.</p></p> <p className="text-gray-400 font-semibold">Start by entering a city name in the search bar.</p></div>
              </div>
              )}

            </div>
            {data != null &&
              <>
                <div className="flex-1 flex-col space-y-3 w-full overflow-auto h-1/2 scroll-smooth">
                  <div className="flex flex-col rounded-lg p-3 bg-gray-600 bg-opacity-80 justify-evenly w-full">
                    <h2 className="mb-2 font-semibold">Today's forecast</h2>
                    <div className="flex flex-row items-center h-full overflow-x-auto w-full">
                      <HourlyForecast data={data} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-around items-center rounded-lg p-3 bg-gray-600 bg-opacity-80 " >
                    <div className="self-start flex"><h2 className="font-semibold">Air Conditions</h2></div>
                    <div className="flex flex-row w-full">
                      <div className="w-1/2 flex flex-row">
                        <span className="material-symbols-outlined">
                          thermostat
                        </span>
                        <div className="flex flex-col">
                          <p>Feels like</p>
                          <p className=" font-semibold text-xl">{`${data?.current.feels_like.toFixed(0)}\u00B0C`}</p>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-row">
                        <span className="material-symbols-outlined">
                          air
                        </span>
                        <div className="flex flex-col">
                          <p>Wind Speed</p>
                          <p className=" font-semibold text-xl">{`${data?.current.wind_speed.toFixed(1)} km/h`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="w-1/2 flex flex-row">
                        <span className="material-symbols-outlined">
                          rainy
                        </span>
                        <div className="flex flex-col">
                          <p>Chance of Rain</p>
                          <p className=" font-semibold text-xl">{`${data?.hourly[0].pop * 100}%`}</p>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-row">
                        <span className="material-symbols-outlined">
                          compress
                        </span>
                        <div className="flex flex-col">
                          <p>Pressure</p>
                          <p className=" font-semibold text-xl">{`${data?.current.pressure}hPa`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-col flex-1 w-full rounded-lg p-3 bg-gray-600 justify-evenly md:hidden bg-opacity-80">
                    <div className="font-semibold">7 Day Forecast</div>
                    <DailyForecast data={data} />
                  </div>
                </div>
              </>
            }
          </div>
          {data != null &&
            <div className="flex-col md:flex w-1/2 rounded-lg bg-gray-600 justify-between hidden bg-opacity-80 p-3">
              <h2 className="font-semibold">7 Day Forecast</h2>
              <DailyForecast data={data} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default App;