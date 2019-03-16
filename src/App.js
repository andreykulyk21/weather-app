import React from "react";
import Info from "./components/info";
import Weather from "./components/weather";
import Form from "./components/form";

const API_KEY = "d7755cc39cd13c9dd3159d2cadb0ac9b";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    clouds: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  };

  formatDate = date => {
    const date_ = new Date(date * 1000);
    return `${`0${date_.getHours()}`.substr(
      -2
    )}:${`0${date_.getMinutes()}`.substr(-2)}:${`0${date_.getSeconds()}`.substr(
      -2
    )}`;
  };

  gettingWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const { sys, main, name, clouds } = await api_url.json();
      const sunset_time = this.formatDate(sys.sunset);
      const sunrise_time = this.formatDate(sys.sunrise);

      this.setState({
        temp: main.temp,
        city: name,
        country: sys.country,
        clouds: clouds.all,
        sunrise: sunrise_time,
        sunset: sunset_time,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        clouds: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Enter the name of the city"
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 info-container">
                <Info />
              </div>
              <div className="col-sm-7" form>
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  clouds={this.state.clouds}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
