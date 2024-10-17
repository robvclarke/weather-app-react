import React, { useState } from "react";
import axios from "axios";
import weatherIcon from '../assets/Weather_Icon.png';

function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [showHeader, setShowHeader] = useState(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0c52510bae0c2562825677b090d11b6b`;

  const searchLocation = (event) => {
    event.preventDefault();
    if (location) {
      axios.get(url).then((response) => {
        setData(response.data);
        setShowHeader(false);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  const getWeatherEmoji = (weatherId) => {
    switch(true) {
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
    <div className={`app ${isDataLoaded ? 'app--loaded' : ''}`}>
      {showHeader && (
        <h1 className="app__header">Clarke<br/>Weather<br/>Inc.</h1>
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
            <img
              src={weatherIcon}
              alt="decorative weather icon"
            />
          </div>
        )}
      </div>

      <div className="app__container">
        <div className="app__top">
          <div className="app__location">
            <p>{data.name}</p>
          </div>
          <div className="app__temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
          </div>
          <div className="app__description">
            <p className="conditionsLabel">Conditions:</p>
            {data.weather ? (
              <p className="conditionsResults">
                 {data.weather[0].main} {getWeatherEmoji(data.weather[0].id)}
              </p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="app__bottom">
            <div className="app__feels">
              <p>Feels like:</p>
              {data.main ? <p className="app__bold">{Math.round(data.main.feels_like)}°C</p> : null}
            </div>
            <div className="app__humidity">
              <p>Humidity:</p>
              {data.main ? <p className="app__bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="app__wind">
              <p>Wind:</p>
              {data.wind ? <p className="app__bold">{Math.round(data.wind.speed * 3.6)} km/h</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
