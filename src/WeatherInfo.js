import React from "react";

const WeatherInfo = props => {
  let results = props.results;
  let country = props.country;

  return (
    <div className="results">
      <p>
        {results.name}
        <img src={country.flag} alt="" className="src" />
      </p>
      <p>{Math.floor(results.main.temp - 272.15)}°</p>
    </div>
  );
};

export default WeatherInfo;
