import React from "react";

const WeatherInfo = props => {
  let results = props.results;
  let country = props.country;
  let icon = () => {
    if (results.main.temp - 272.15 >= 15) {
      return <i class="fas fa-temperature-high"></i>;
    } else if (results.main.temp - 272.15 >= 0) {
      return <i class="fas fa-temperature-low"></i>;
    } else return <i class="fas fa-snowflake"></i>;
  };
  console.log(icon);
  return (
    <div className="results">
      <p>
        {results.name} <img src={country.flag} alt="" className="src" />
      </p>
      <p className="temp">
        {Math.floor(results.main.temp - 272.15)}° {icon()}
      </p>
    </div>
  );
};

export default WeatherInfo;
