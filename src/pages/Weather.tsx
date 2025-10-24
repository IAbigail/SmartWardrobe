import React, { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "c3864bba8cf524f2ace389650c32edf1";

          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );          

          if (!response.ok) throw new Error("Failed to fetch weather data");

          const data = await response.json();

          setWeather({
            temperature: data.main.temp,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            city: data.name, 
          });
          

          setLoading(false);
        });
      } catch (err) {
        setError("Unable to get weather data 😞");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getOutfitRecommendation = (temp: number, condition: string) => {
    if (condition.toLowerCase().includes("rain"))
      return "Bring a raincoat and waterproof shoes ☔";
    if (temp < 10) return "Bundle up! It's sweater and jacket weather 🧥";
    if (temp < 20) return "A cozy sweater or hoodie would be perfect 👕";
    if (temp < 28) return "Light casual wear is ideal 👕👖";
    return "Stay cool — shorts and a t-shirt recommended 😎";
  };

  if (loading) return <div className="page-container"><p>Loading weather...</p></div>;
  if (error) return <div className="page-container"><p>{error}</p></div>;

  return (
    <div className="weather-container">
      {weather ? (
        <div className="weather-info">
          <h2>🌤️ Weather</h2>
          <strong>
            {weather.city} - {Math.round(weather.temperature)}°C • {weather.condition}
          </strong>
          <p>{getOutfitRecommendation(weather.temperature, weather.condition)}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
  
};

export default Weather;
