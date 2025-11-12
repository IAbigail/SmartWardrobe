import React, { createContext, useContext, useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  city: string;
}

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  loading: true,
  error: null,
});

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "c3864bba8cf524f2ace389650c32edf1"; // your key

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

  return (
    <WeatherContext.Provider value={{ weather, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
