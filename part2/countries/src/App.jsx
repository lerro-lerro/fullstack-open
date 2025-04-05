import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    const apiKey = import.meta.env.VITE_API_KEY;
    const capital = country.capital && country.capital[0];
    if (capital && apiKey) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
          setWeather(null);
        });
    } else {
      setWeather(null);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  let content;
  if (filter === "") {
    content = <div>Type in a search query to find countries.</div>;
  } else if (filteredCountries.length > 10) {
    content = <div>Too many matches, specify another filter.</div>;
  } else if (filteredCountries.length === 1 || selectedCountry) {
    const country = selectedCountry || filteredCountries[0];
    content = <CountryDetail country={country} weather={weather} />;
  } else {
    content = (
      <CountryList
        countries={filteredCountries}
        onShowCountry={handleShowCountry}
      />
    );
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {content}
    </div>
  );
};

export default App;
