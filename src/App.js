import React, { Component } from "react";
import WeatherInfo from "./WeatherInfo";
import Intro from "./Intro";
import "./App.css";

class App extends Component {
  state = {
    loaded: false,
    language: "eng",
    city: "",
    country: "",
    results: "",
    image: ""
  };

  handleInput = e => {
    let city = e.target.value.toLowerCase();

    this.setState({
      city
    });
  };

  fetchCity = e => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=ea05aba774b348280020de52b353966f`
    ).then(results => {
      if (results.status === 200) {
        return results
          .json()

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
                ).then(results => {
                  if (results.status === 200) {
                    return results.json().then(results => {
                      this.setState({
                        image:
                          results.hits[
                            Math.floor(Math.random() * results.hits.length)
                          ].largeImageURL
                      });
                    });
                  } else return null;
                });
              });
          });
      } else alert("No such city, try again!");
    });

    this.setState({
      city: "",
      country: "",
      results: ""
    });
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 2000);
  }

  render() {
    let style = { backgroundImage: `url(${this.state.image})` };
    return this.state.loaded ? (
      <div className="app" style={style}>
        <div className="overlay"></div>
        <form action="submit">
          <input
            type="text"
            value={this.state.city}
            onChange={this.handleInput}
          />
          <button onClick={this.fetchCity}>
            <i class="fas fa-search"></i>
          </button>
        </form>
        {this.state.results !== "" ? (
          <WeatherInfo
            results={this.state.results}
            country={this.state.country}
          />
        ) : (
          <h1 className="info">Punch in a city!</h1>
        )}
      </div>
    ) : (
      <Intro />
    );
  }
}

export default App;
