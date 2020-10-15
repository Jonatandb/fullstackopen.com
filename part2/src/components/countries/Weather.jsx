import React from 'react'
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(() => {
        return {
            temperature: 0,
            wind: 0,
            icon: ''
        }
    })

    useEffect(() => {
        const api_key = 'f99bbd9e4959b513e9bd0d7f7356b38d';
        const url_base_weather = 'https://api.openweathermap.org/data/2.5/weather';
        const [lat, long] = country.latlng
        const url = `${url_base_weather}?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherData = {
                    temperature: data?.main?.temp,
                    wind: data?.wind?.speed,
                    icon: `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`
                }
                setWeather(weatherData)
            })
            .catch(e => {
                console.log(e)
            })
    }, [country])

    return <>
        <h2>Weather in {country.name}</h2>
        <p><strong>temperature: </strong>{weather.temperature} Celcius</p>
        <img src={weather.icon} alt={`Weather icon for ${country.name}`} />
        <p><strong>wind: </strong>{weather.wind} mph</p>
    </>
}

export default Weather