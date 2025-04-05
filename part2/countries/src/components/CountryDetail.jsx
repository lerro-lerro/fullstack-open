import React from "react";

const CountryDetail = ({ country, weather }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>Capital: {country.capital ? country.capital[0] : "N/A"}</div>
      <div>Area: {country.area}</div>
      <h4>Languages:</h4>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
      {weather && (
        <div>
          <h4>Weather in {country.capital && country.capital[0]}</h4>
          <div>Temperature: {weather.main.temp} °C</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
