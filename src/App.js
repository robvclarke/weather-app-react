import React, {useState} from "react";
import axios from "axios";
function App() {

  //const url =  `https://api.openweathermap.org/data/2.5/weather?q=dublin&appid=0c52510bae0c2562825677b090d11b6b`
  
  return (
    <div className="app">
        <div className="container">
          <div className="top">
            <div className="location">
              <p>Dublin</p>
            </div>
            <div className="temp">
              <h1>60°F</h1>
            </div>
            <div className="description">
              <p>Clouds</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p>Feels like:</p>
              <p className="bold">65°F</p>
            </div>
            <div className="humidity">
              <p>Humidity:</p>
              <p className="bold">20%</p>
            </div>
            <div className="wind">
              <p>Wind:</p>
              <p className="bold"> 12 MPH</p>
            </div>
          </div>   
        </div> 
    </div>
  );
}

export default App;
