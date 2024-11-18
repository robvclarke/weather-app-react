import React, { useState, useEffect } from "react";
import axios from "axios";
import feelsLikeIcon from '../assets/feels_Like.svg';
import humidityIcon from '../assets/Humidity_Icon.svg';
import windIcon from '../assets/Wind_Icon.svg';
import locationIcon from '../assets/location_icon.svg';
import gradientLogo from '../assets/GradientLogo.png';
import { useForm } from "react-hook-form";

function Home() {
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('');
  const [showHeader, setShowHeader] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const apiKey = "0c52510bae0c2562825677b090d11b6b";
  const unsplashKey = "PGJKpfliiakxMxS97n55E2Ke2BAgBFW4S-Cx_BCZuxw";

  const fetchWeatherByCity = async (city) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const weatherResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/weather?q=${city}&units=metric&appid=${apiKey}`
      );      
      setData(weatherResponse.data);
      setLocation(city);
      fetchForecast(city);
      fetchBackgroundImage(city);
      setShowHeader(false);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setErrorMessage("Could not find the specified city. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    setIsLoading(true);
    try {
      const weatherResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const city = weatherResponse.data.name;
      setData(weatherResponse.data);
      setLocation(city);
      fetchForecast(city);
      fetchBackgroundImage(city);
      setShowHeader(false);
      setLocationAllowed(true);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setLocationAllowed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const dailyForecasts = forecastResponse.data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyForecasts);
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
  };

  const fetchBackgroundImage = async (city) => {
    try {
      const unsplashResponse = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}`
      );
      const imageUrl = unsplashResponse.data.results[0]?.urls?.regular;
      setBackgroundImage(imageUrl || null);
    } catch (error) {
      console.error("Error fetching background image", error);
      setBackgroundImage(null);
    }
  };

  const requestUserLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
        setShowLocationPrompt(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationAllowed(false);
        setShowLocationPrompt(false);
        setIsLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (showLocationPrompt) {
      setLocationAllowed(false);
    }
  }, [showLocationPrompt]);

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

  const getMapUrl = (city) => {
    const googleMapsApiKey = "AIzaSyA2DqzlChVXzYUJnwV9NS_VUOvXXXOfiyU";
    return `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(city)}`;
  };

  return (
    <div
      className={`app ${isLoading ? 'app--loading' : 'app--loaded'}`}
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`
          : 'none',
        backgroundColor: backgroundImage ? "transparent" : "#74FAFF",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isLoading && (
        <div className="loading loading--central">
          <p>Loading weather data...</p>
          <div className="spinner"></div>
        </div>
      )}

      {!isLoading && (
        <>
          {showLocationPrompt && (
            <div className="location-prompt">
              <div className="location-prompt__header">
                <img src={locationIcon} alt="Location icon" className="location-icon" />
                <p>Would you like to grant 'Clarke Weather Inc' location access to see the weather in your area?</p>
              </div>
              <button className="primary-button" onClick={requestUserLocation}>Allow Location</button>
              <button className="secondary-button" onClick={() => setShowLocationPrompt(false)}>No, Thanks</button>
            </div>
          )}

          {showHeader && (
            <div className="app__header">
              <img src={gradientLogo} alt="Clarke Weather Inc Logo" className="app__logo" />
            </div>
          )}

          {/* Show the H1 title only when data hasn't loaded yet */}
          {showHeader && !data.name && (
            <div className="app__title-container">
              <h1 className="app__title">Clarke Weather Inc.</h1>
            </div>
          )}

          <div className={`app__search ${data.name ? 'app__search--loaded' : ''}`}>
            <form
              className="app__form"
              onSubmit={handleSubmit((data) => {
                if (data.location.trim()) fetchWeatherByCity(data.location.trim());
              })}
            >
              <input
                className="app__input"
                {...register("location", { required: "Please enter a location." })}
                placeholder="Enter Location"
                type="text"
                onChange={(e) => {
                  setLocation(e.target.value);
                  setValue('location', e.target.value);
                }}
              />
              {errors.location && <p className="error-message">{errors.location.message}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button className="app__button" type="submit">
                Search
              </button>
            </form>
          </div>

          {data.name && (
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
            </div>
          )}

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

          {/* Google Maps Embed */}
          {data.name && (
            <div className="app__map">
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src={getMapUrl(data.name)}
                allowFullScreen
                title="Location map of {data.name}" // Add a title for accessibility
              ></iframe>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
