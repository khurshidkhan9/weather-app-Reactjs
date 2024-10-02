// weather app
import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


const App = () => {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const API_KEY = '8331cdef4f10633c84fd856ce65588b0';

  useEffect(() => {

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
        );

        setWeatherData(response.data);
        updateBackgroundImage(response.data.weather[0].main);
        setError('')
      } catch (error) {
        setError('City not Found, please try again!');
        setWeatherData(null);
      }
    };

    fetchWeatherData();

  }, [city, unit]);

  const updateBackgroundImage = (condition) => {
    switch (condition.toLowerCase()) {
      case 'rain':
        setBackgroundImage(
          'url(https://images.unsplash.com/photo-1527766833261-b09c3163a791?fit=crop&w=1200&h=800&q=80)'
        );
        break;
      case 'clear':
        setBackgroundImage(
          'url(https://images.unsplash.com/photo-1502082553048-f009c37129b9?fit=crop&w=1200&h=800&q=80)'
        );
        break;
      case 'Clouds':
        setBackgroundImage(
          'url(https://images.unsplash.com/photo-1533591841847-58a40a23696b?fit=crop&w=1200&h=800&q=80)'
        );
        break;
      case 'snow':
        setBackgroundImage(
          'url(https://images.unsplash.com/photo-1600402446379-7f1eec1d7201?fit=crop&w=1200&h=800&q=80)'
        );
        break;
      default:
        setBackgroundImage(
          'url(https://images.unsplash.com/photo-1487621167305-5d248087c724?fit=crop&w=1200&h=800&q=80)'
        );
        break;
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const cityInput = event.target.elements.city.value.trim();
    if (cityInput) {
      setCity(cityInput);
    }
    event.target.elements.city.value = '';
  };

  return (
    <div className="container" style={{ backgroundImage: backgroundImage }}>
      <div className="weather__header">
        <form className="weather__search" onSubmit={handleSearch}>
          <input
            type="text"
            name="city"
            placeholder="Search for a city..."
            className="weather__searchform"
          ></input>
          <i className="fa-solid fa-magnifying-glass"></i>
        </form>
        <div className="weather__units">
          <span onClick={() => handleUnitChange('metric')}>&#176;C</span>
          <span onClick={() => handleUnitChange('imperial')}>&#176;F</span>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather__body">
          <h1 className="weather__city">{weatherData.name}</h1>
          <div className="weather__datetime">{new Date().toLocaleString()}</div>
          <div className="weather__forcast">{weatherData.weather[0].description}</div>
          <div className="weather__icon">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt='weather icon'
            />
          </div>
          <p className="weather__temperature">{Math.round(weatherData.main.temp)}&#176;</p>
          <div className="weather__minmax">
            <p>Min: {Math.round(weatherData.main.temp_min)}&#176;</p>
            <p>Max: {Math.round(weatherData.main.temp_max)}&#176;</p>
          </div>

          <div className="weather__info">
            <div className="weather__card">
              <i className="fa-solid fa-temperature-full"></i>
              <div>
                <p>Real Feel</p>
                <p className="weather__realfeel">{Math.round(weatherData.main.feels_like)}&#176;</p>
                </div>
            </div>
            <div className="weather__card">
              <i className="fa-solid fa-droplet"></i>
              <div>
                <p>Humidity</p>
                <p className="weather__humidity">{weatherData.main.humidity}%</p>
                </div>
            </div>
            <div className="weather__card">
              <i className="fa-solid fa-wind"></i>
              <div>
                <p>Wind</p>
                <p className="weather__wind">{weatherData.main.speed}m/s</p>
                </div>
            </div>
            <div className="weather__card">
              <i className="fa-solid fa-guage-high"></i>
              <div>
                <p>Pressure</p>
                <p className="weather__pressure">{weatherData.main.pressure}hPa</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;