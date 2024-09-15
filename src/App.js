import React, {useState} from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0c52510bae0c2562825677b090d11b6b`
  
  const searchLocation = (event) => {
      if (event.key === 'Enter') {
        axios.get(url).then(response => {
          setData(response.data);
          console.log(response.data);
        })
        setLocation('');
      }
  }
     
  // Check if data is loaded
  const isDataLoaded = data.name !== undefined;

  return (
    <div className={`app ${isDataLoaded ? 'loaded' : ''}`}>
        <div className="search">
        {/* Wrap the input and button inside a form */}
        <form onSubmit={searchLocation}>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            type="text"
          />
          {/* Add the search button */}
          <button type="submit">Search</button>
        </form>
      </div>

        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels like:</p>
              {data.main ? <p className="bold">{Math.round(data.main.feels_like)}°C</p> : null}
            </div>
            <div className="humidity">
              <p>Humidity:</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind:</p>
              {data.wind ? (<p className="bold">{Math.round(data.wind.speed * 3.6)} km/h</p>) : null}
            </div>
          </div> 
          }
        </div> 
    </div>
  );
}

export default App;
