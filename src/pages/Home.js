import React, { useState } from "react";
import axios from "axios";
import weatherIcon from '../assets/Weather_Icon.png';
import feelsLikeIcon from '../assets/feels_Like.svg';
import humidityIcon from '../assets/Humidity_Icon.svg';
import windIcon from '../assets/Wind_Icon.svg';

function Home() {
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('');
  const [showHeader, setShowHeader] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const apiKey = "0c52510bae0c2562825677b090d11b6b";
  const unsplashKey = "PGJKpfliiakxMxS97n55E2Ke2BAgBFW4S-Cx_BCZuxw";
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = async (event) => {
    event.preventDefault();
    if (location) {
      try {
        const weatherResponse = await axios.get(currentWeatherUrl);
        setData(weatherResponse.data);
        setShowHeader(false);

        const forecastResponse = await axios.get(forecastUrl);
        const dailyForecasts = forecastResponse.data.list.filter((forecast) =>
          forecast.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyForecasts);

        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${location}&client_id=${unsplashKey}`
        );
        const imageUrl = unsplashResponse.data.results[0]?.urls?.regular;
        setBackgroundImage(imageUrl || null);
        
      } catch (error) {
        console.error("Error fetching data", error);
        setBackgroundImage(null);
      }

      setLocation('');
    }
  };

  const getWeatherEmoji = (weatherId) => {
    switch (true) {
      case (weatherId >= 200 && weatherId < 300):
        return "⛈️";
      case (weatherId >= 300 && weatherId < 400):
        return "🌨️";
      case (weatherId >= 500 && weatherId < 600):
        return "🌨️";
      case (weatherId >= 600 && weatherId < 700):
        return "❄️";
      case (weatherId >= 700 && weatherId < 800):
        return "🌫️";
      case (weatherId === 800):
        return "🌞";
      case (weatherId >= 801 && weatherId < 810):
        return "☁️";
      default:
        return "⁇";
    }
  };

  const isDataLoaded = data.name !== undefined;

  return (
    <div
      className={`app ${isDataLoaded ? 'app--loaded' : ''}`}
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
          : `linear-gradient(120deg, #14ADFE, #136EF3)`,
        backgroundSize: backgroundImage ? "cover, cover" : "100% 100%",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat"
      }}
    >
      {showHeader && (
        <h1 className="app__header">Clarke<br />Weather<br />Inc.</h1>
      )}

      <div className="app__search">
        <form className="app__form" onSubmit={searchLocation}>
          <input
            className="app__input"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            type="text"
          />
          <button className="app__button" type="submit">Search</button>
        </form>

        {showHeader && (
          <div className="app__image">
            <img src={weatherIcon} alt="decorative weather icon" />
          </div>
        )}
      </div>

      <div className="app__container">
        <div className="app__top">
          <div className="app__location">
            <h1>{data.name}</h1>
          </div>
          <div className="app__temp">
            {data.main ? <h2>{Math.round(data.main.temp)}°C</h2> : null}
          </div>
          <hr className="divider" />
          <div className="app__description">
            <p className="conditionsLabel">Current Conditions:</p>
            {data.weather ? (
              <p className="conditionsResults">
                {data.weather[0].main} {getWeatherEmoji(data.weather[0].id)}
              </p>
            ) : null}
          </div>
        </div>

        {data.name && (
          <div className="app__bottom">
            <div className="app__feels">
              <img src={feelsLikeIcon} alt="Feels like icon" className="icon" />
              <div className="app__text">
                <p className="app__label">Feels like:</p>
                {data.main ? <p className="app__bold">{Math.round(data.main.feels_like)}°C</p> : null}
              </div>
            </div>
            <div className="app__humidity">
              <img src={humidityIcon} alt="Humidity icon" className="icon" />
              <div className="app__text">
                <p className="app__label">Humidity:</p>
                {data.main ? <p className="app__bold">{data.main.humidity}%</p> : null}
              </div>
            </div>
            <div className="app__wind">
              <img src={windIcon} alt="Wind icon" className="icon" />
              <div className="app__text">
                <p className="app__label">Wind:</p>
                {data.wind ? <p className="app__bold">{Math.round(data.wind.speed * 3.6)} km/h</p> : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {forecastData.length > 0 && (
        <div className="app__forecast-section">
          <h2 className="forecast__label">Five Day Forecast</h2>
          <div className="app__forecast">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast__card">
                <p>{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                <p>{Math.round(day.main.temp)}°C</p>
                <p>{day.weather[0].main} {getWeatherEmoji(day.weather[0].id)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
