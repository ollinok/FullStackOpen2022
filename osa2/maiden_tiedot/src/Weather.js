import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ capital, latlng }) => {
  const [weatherData, setWeatherData] = useState(0);

  useEffect(() => {
    const lat = latlng[0];
    const lon = latlng[1];
    const APIkey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`)
      .then(response => {
          console.log('sää haettu');
          setWeatherData(response.data);
        });
  }, [latlng]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      {weatherData === 0 ?
        <p>Loading data...</p>
        :
        <div>
          <p>Temperature: {weatherData.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      }
    </div>
  );
}

export default Weather;