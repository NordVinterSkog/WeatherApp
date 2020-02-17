import React, { Component } from "react";
import WeatherInfo from "./WeatherInfo";
import "./App.css";

class App extends Component {
  state = {
    loaded: true,
    language: "eng",
    city: "",
    country: "",
    results: "",
    image: ""
  };

  handleInput = e => {
    let city = e.target.value.toUpperCase();

    console.log(city);
    this.setState({
      city
    });
  };

  fetchCity = e => {
    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=ea05aba774b348280020de52b353966f`
    )
      .then(results => {
        return results.json();
      })
      .then(results => {
        this.setState({ results });
        fetch(
          `https://restcountries.eu/rest/v2/alpha/${results.sys.country}?fields=name;flag`
        )
          .then(results => {
            return results.json();
          })
          .then(results => {
            this.setState({ country: results });
            fetch(
              `https://pixabay.com/api/?key=14976958-ee38bbe3e71cf647de563cf70&q=${results.name}&image_type=photo&pretty=true`
            )
              .then(results => {
                return results.json();
              })
              .then(results => {
                console.log(results);
                this.setState({
                  image:
                    results.hits[
                      Math.floor(Math.random() * results.hits.length)
                    ].largeImageURL
                });
              });
          });
      });

    this.setState({
      city: "",
      country: "",
      results: ""
    });
  };

  render() {
    console.log(this.state.results);
    console.log(this.state.country);
    let style = { backgroundImage: `url(${this.state.image})` };
    return (
      <div className="app" style={style}>
        <form action="submit">
          <input
            type="text"
            value={this.state.city}
            onChange={this.handleInput}
          />
          <button onClick={this.fetchCity}>GO!</button>
        </form>
        {this.state.results !== "" ? (
          <WeatherInfo
            results={this.state.results}
            country={this.state.country}
          />
        ) : (
          <div>tu będą wyniki</div>
        )}
      </div>
    );
  }
}

export default App;
