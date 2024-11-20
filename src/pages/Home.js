import React, { useState, useEffect } from "react";
import axios from "axios"; // Importing axios for making HTTP requests to external APIs 
import feelsLikeIcon from '../assets/feels_Like.svg';
import humidityIcon from '../assets/Humidity_Icon.svg';
import windIcon from '../assets/Wind_Icon.svg';
import locationIcon from '../assets/location_icon.svg';
import gradientLogo from '../assets/GradientLogo.png';
import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form for managing form state and validation in the search form

// Main component for the home page
function Home() {
  // State hooks for managing various pieces of data in the app
  const [data, setData] = useState({});  // Stores current weather data
  const [forecastData, setForecastData] = useState([]);  // Stores 5-day forecast data
  const [location, setLocation] = useState('');  // Stores location entered by user
  const [showHeader, setShowHeader] = useState(true);  // Controls header visibility
  const [backgroundImage, setBackgroundImage] = useState(null);  // Stores background image URL
  const [locationAllowed, setLocationAllowed] = useState(false);  // Tracks if user allowed location access
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);  // Controls visibility of location prompt
  const [isLoading, setIsLoading] = useState(false);  // Tracks loading state
  const [errorMessage, setErrorMessage] = useState(null);  // Stores error messages

  // react-hook-form setup for form handling
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // API keys for OpenWeather, Unsplash, and Google Maps
  const apiKey = "0c52510bae0c2562825677b090d11b6b"; // OpenWeather API key
  const unsplashKey = "PGJKpfliiakxMxS97n55E2Ke2BAgBFW4S-Cx_BCZuxw"; // Unsplash API key

  // Get the Google Maps API key from environment variables
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Fetch weather data by city name
  const fetchWeatherByCity = async (city) => {
    setIsLoading(true);  // Set loading to true while waiting for the API response
    setErrorMessage(null);  // Reset any previous error messages

    try {
      // Construct the API URL for fetching weather data
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/weather?q=${city}&units=metric&appid=${apiKey}`;
      console.log('API URL:', apiUrl);  // Log the API URL for debugging
      const weatherResponse = await axios.get(apiUrl);  // Make the API request
      setData(weatherResponse.data);  // Store the weather data
      setLocation(city);  // Store the city name
      fetchForecast(city);  // Fetch the 5-day forecast
      fetchBackgroundImage(city);  // Fetch background image based on city
      setShowHeader(false);  // Hide the header once data is fetched
    } catch (error) {
      console.error("Error fetching weather data", error);
      setErrorMessage("Could not find the specified city. Please try again.");
    } finally {
      setIsLoading(false);  // Set loading to false after the data has been fetched
    }
  };

  // Fetch weather data using latitude and longitude
  const fetchWeatherByCoordinates = async (lat, lon) => {
    console.log("Fetching weather for coordinates:", lat, lon); // Log the coordinates for debugging

    try {
      // Construct the API URL for fetching weather data by coordinates
      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      console.log('API URL:', apiUrl);  // Log the API URL for debugging
      const weatherResponse = await axios.get(apiUrl);  // Make the API request
      console.log("Weather data:", weatherResponse.data);  // Log the weather data for debugging
      const city = weatherResponse.data.name;  // Get city name from the weather response
      setData(weatherResponse.data);  // Store the weather data
      setLocation(city);  // Store the city name
      fetchForecast(city);  // Fetch the 5-day forecast
      fetchBackgroundImage(city);  // Fetch background image based on city
      setShowHeader(false);  // Hide the header once data is fetched
    } catch (error) {
      console.error("Error fetching weather data", error);
      setErrorMessage("Could not retrieve weather data. Please try again.");
    } finally {
      setIsLoading(false);  // Set loading to false after the data has been fetched
    }
  };

  // Fetch 5-day weather forecast data
  const fetchForecast = async (city) => {
    try {
      // Fetch 5-day weather forecast from OpenWeather API
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      // Filter to only include daily forecasts at noon (12:00)
      const dailyForecasts = forecastResponse.data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyForecasts);  // Store the forecast data
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
  };

  // Fetch background image from Unsplash based on city
  const fetchBackgroundImage = async (city) => {
    try {
      // Fetch a background image based on the city name
      const unsplashResponse = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}`
      );
      // Set the background image URL based on the Unsplash response
      const imageUrl = unsplashResponse.data.results[0]?.urls?.regular;
      setBackgroundImage(imageUrl || null);  // If no image found, set to null
    } catch (error) {
      console.error("Error fetching background image", error);
      setBackgroundImage(null);  // Set to null in case of error
    }
  };

  // Request user's location using the browser's geolocation API
  const requestUserLocation = () => {
    setIsLoading(true);  // Set loading to true while waiting for the geolocation response
    console.log("Requesting user location...");

    // Get current position from the geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;  // Destructure the latitude and longitude
        console.log("Location retrieved:", latitude, longitude);  // Log the coordinates for debugging
        fetchWeatherByCoordinates(latitude, longitude);  // Fetch weather using the coordinates
        setShowLocationPrompt(false);  // Hide the location prompt once user allows location
      },
      (error) => {
        console.error("Geolocation error:", error);  // Log any geolocation errors
        setLocationAllowed(false);  // Set locationAllowed to false in case of error
        setShowLocationPrompt(false);  // Hide the location prompt in case of error
        setIsLoading(false);  // Set loading to false
      },
      { enableHighAccuracy: true }  // Request for high accuracy in geolocation
    );
  };

  // useEffect hook that runs when the location prompt is shown
  useEffect(() => {
    if (showLocationPrompt) {
      setLocationAllowed(false);  // Set locationAllowed to false when the prompt is shown
    }
  }, [showLocationPrompt]);

  // Function to get weather emoji based on weather ID
  const getWeatherEmoji = (weatherId) => {
    switch (true) {
      case (weatherId >= 200 && weatherId < 300):
        return "⛈️";  // Thunderstorm
      case (weatherId >= 300 && weatherId < 400):
        return "🌨️";  // Drizzle
      case (weatherId >= 500 && weatherId < 600):
        return "🌨️";  // Rain
      case (weatherId >= 600 && weatherId < 700):
        return "❄️";  // Snow
      case (weatherId >= 700 && weatherId < 800):
        return "🌫️";  // Atmospheric conditions
      case (weatherId === 800):
        return "🌞";  // Clear sky
      case (weatherId >= 801 && weatherId < 810):
        return "☁️";  // Clouds
      default:
        return "⁇";  // Unknown weather condition
    }
  };

  // Get Google Maps Embed URL for the city
  const getMapUrl = (city) => {
    return `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(city)}`;
  };

  // JSX returned by the component
  return (
    <div
      className={`app ${isLoading ? 'app--loading' : 'app--loaded'}`}  // Conditional class based on loading state
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`
          : 'none',  // Set background image or fallback to none
        backgroundColor: backgroundImage ? "transparent" : "#74FAFF",  // Set fallback background color
        backgroundSize: "cover",  // Ensure background covers the whole screen
        backgroundPosition: "center",  // Center the background image
        backgroundRepeat: "no-repeat",  // Prevent background repetition
      }}
    >
      {/* Loading spinner */}
      {isLoading && (
        <div className="loading loading--central">
          <p>Loading weather data...</p>
          <div className="spinner"></div>
        </div>
      )}

      {!isLoading && (
        <>
          {/* Location access prompt */}
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

          {/* Header with logo */}
          {showHeader && (
            <div className="app__header">
              <img src={gradientLogo} alt="Clarke Weather Inc Logo" className="app__logo" />
            </div>
          )}

          {/* Title */}
          {showHeader && !data.name && (
            <div className="app__title-container">
              <h1 className="app__title">Clarke Weather Inc.</h1>
            </div>
          )}

          {/* Search form */}
          <div className={`app__search ${data.name ? 'app__search--loaded' : ''}`}>
            <form
              className="app__form"
              onSubmit={handleSubmit((data) => {
                if (data.location.trim()) fetchWeatherByCity(data.location.trim());  // Fetch weather on form submit
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

          {/* Weather data */}
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

              {/* Weather details */}
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

          {/* 5-day forecast */}
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
                title="Location map of {data.name}"
              ></iframe>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
