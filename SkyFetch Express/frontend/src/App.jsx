import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // States
  const [city, setCity] = useState("");
  const [response, setResponse] = useState("");

  // GET Method -- End Point (:/citynane) -- Backend
  const searchWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/${city}`);
      setResponse(res.data);
    } catch (error) {
      setResponse({ error: "City not found or server error" });
    }
  };

  return (
    <>
      <div className="weather-bg">
        <div className="cloud"></div>
        <div className="cloud cloud2"></div>

        <div className="container">
          <h1 className="title">🌦 Weather App</h1>

          {/* Input Section */}
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={searchWeather}>Search</button>
          </div>

          <div className="result">
            {response ? (
              response.error ? (
                <p className="error">{response.error}</p>
              ) : (
                <div className="info-grid">
                  <div className="info-box">
                    <p className="info-title">🏙 City</p>
                    <p className="info-value">{response.city}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-title">🌍 Country</p>
                    <p className="info-value">{response.country}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-title">🌡 Temperature</p>
                    <p className="info-value">{response.temperature}°K</p>
                  </div>
                  <div className="info-box">
                    <p className="info-title">💧 Humidity</p>
                    <p className="info-value">
                      {response.temperature_humidity}%
                    </p>
                  </div>
                  <div className="info-box">
                    <p className="info-title">💨 Wind Speed</p>
                    <p className="info-value">{response.wind_speed} m/s</p>
                  </div>
                  <div className="info-box">
                    <p className="info-title">🧭 Wind Degree</p>
                    <p className="info-value">{response.wind_deg}°</p>
                  </div>
                </div>
              )
            ) : (
              <p className="placeholder">Enter a city to get weather info</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
