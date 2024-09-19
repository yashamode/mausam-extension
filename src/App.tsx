import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [location, setLocation] = useState<string>("london");
  const [inputLocation, setInputLocation] = useState<string>("");
  const [error, setError] = useState<string>("");

  const apiKey: string = import.meta.env.VITE_API_KEY;
  const baseUrl: string = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}?q=${location}&appid=${apiKey}`);
        if (!response.ok) {
          setError("No city found");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeatherData(data);
        setError(""); // Clear any previous errors
        console.log("data", data);
      } catch (e) {
        console.error("Cannot fetch data", e);
      }
    };
    fetchData();
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
  };

  const handleButtonClick = () => {
    setLocation(inputLocation);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={inputLocation}
        onChange={handleInputChange}
        placeholder="Enter location"
      />
      <button onClick={handleButtonClick}>Get Weather</button>
      {error ? (
        <p className="error">{error}</p>
      ) : weatherData ? (
        <div className="weather-info">
          <h1>Weather in {weatherData.name}</h1>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;