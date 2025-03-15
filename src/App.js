import React, { useState } from "react";
import { getWeatherData } from "./WeatherService";
import { Line } from "react-chartjs-2";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchWeather = async () => {
    const data = await getWeatherData(city);
    if (data) {
      setWeather(data);
      setHistory((prev) => [...prev, { temp: data.main.temp, time: new Date().toLocaleTimeString() }]);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🌤 Weather Analysis App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
          <p>🌥 Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ width: "500px", margin: "auto" }}>
          <h3>Temperature Trend</h3>
          <Line
            data={{
              labels: history.map((entry) => entry.time),
              datasets: [
                {
                  label: "Temperature (°C)",
                  data: history.map((entry) => entry.temp),
                  borderColor: "blue",
                  fill: false,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
