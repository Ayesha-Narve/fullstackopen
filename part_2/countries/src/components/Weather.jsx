import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [capital, apiKey])

  if (!weather) {
    return <p>Loading weather...</p>
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>

      <p>
        <strong>Temperature:</strong> {weather.main.temp} °C
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />

      <p>
        <strong>Wind:</strong> {weather.wind.speed} m/s
      </p>
    </div>
  )
}

export default Weather