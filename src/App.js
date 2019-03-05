import React from "react";
import Info from "./components/info";
import Weather from "./components/weather";
import Form from "./components/form";

const API_KEY = "d7755cc39cd13c9dd3159d2cadb0ac9b";

class App extends React.Component {
  gettingWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await api_url.json();
    console.log(data);
  };

  render() {
    return (
      <div>
        <Info />
        <Form weatherMethod={this.gettingWeather} />
        <Weather />
      </div>
    );
  }
}

export default App;
