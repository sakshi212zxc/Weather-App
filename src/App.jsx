import React, { useEffect, useState } from 'react';
import './App.css';
import search_icon from './assets/search.png';
import clear_icon from './assets/clear.png';
import humidity_icon from './assets/humidity.png';
import wind_icon from './assets/wind.png';
import rain_icon from './assets/rain.png';
import drizzle_icon from './assets/drizzle.png';


const getWeather=(data)=>{
  switch(data.weather[0].main.toLowerCase()){
    case "rain":
      return rain_icon;
    case "clear":
      return clear_icon;
    case "clound":
      return clound_icon;
    case "drizzle":
      return drizzle_icon;
    case "snow":
      return snow_icon; 
  }
}

async function getWeatherData(BASE_URL) {
  let response = await fetch(BASE_URL);
  let data = await response.json();
  return data;
}

function App() {
  const [location, setLocation] = useState('Mumbai');
  const [data, setData] = useState({});
  const [weather, setWeather]=useState(clear_icon);
  const API_KEY = 'ad658b19a41c929828a28a9ddf326e04';
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  useEffect(() => {
    getWeatherData(BASE_URL).then((d) => {
      setData(d);
      console.log(data);
      let icon=getWeather(data);
      setWeather(icon);

    });
  }, [location]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input 
          type="text" 
          value={location} 
          placeholder="Search"
          onChange={(event) => setLocation(event.target.value)}
        />
        <img src={search_icon} alt="search" onClick={() => getWeatherData(BASE_URL).then((d) => setData(d))} />
      </div>
      <div className="align">
        <img src={weather} alt="clear" className="weather-icon" />
        <div className="content">
          <p className="temperature">{(data.main?.temp - 273.15).toFixed(2)}°C</p>
          <p className="location">{data.name}</p>
        </div>
      </div>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{data.main?.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>{data.wind?.speed} Km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
