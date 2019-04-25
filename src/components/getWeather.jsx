import React, { Component } from "react";
import ListCities from "./listCities";
import LargeDisplay from "./largeDisplay";

const API = "http://api.openweathermap.org/data/2.5/weather?q=";
const APPID = "&appid=c51223c219d6aec8cb8c5210449bd859";
let units = "&units=metric";

const APIF = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
let unitsF = "&units=metric&cnt=6";

let forecastRequest = false;

class GetWeather extends Component {
  state = {
    cityList: [
      { cityName: "null", temperature: "null", weatherStatus: "null" }
    ],
    cityName: undefined,
    cityNameForecast: undefined,
    updateDateForecast: undefined,
    dt: 0,
    temperature: undefined,
    weatherStatus: undefined,
    forecastData: {
      city: {
        name: ""
      },
      list: [
        {
          temp: {
            day: ""
          },
          dt: "",
          pressure: "",
          weather: [{ main: "" }],
          speed: "",
          deg: ""
        }
      ]
    }
  };

  getWeather = event => {
    let cityNameInput = event;
    document.getElementById("cityName").value = "";

    fetch(API + cityNameInput + APPID + units)
      .then(res => res.json())
      .then(data => {
        if (data.cod == 404) alert("City Not Found");
        else if (data.cod == 400) alert("Input a city name");
        else if (data.cod == 200) {
          this.setState({
            temperature: data.main.temp,
            weatherStatus: data.weather[0].description,
            cityName: cityNameInput,
            dt: data.dt
          });
        }
      });
  };

  forecastFiveDays = event => {
    forecastRequest = true;
    let cityNameInput = event;
    let a = new Date();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let updateDate = hour + ":" + min + ":" + sec;
    fetch(APIF + cityNameInput + APPID + unitsF)
      .then(res => res.json())
      .then(data => {
        if (data.cod == 404) alert("City Not Found");
        else if (data.cod == 400) alert("Input a city name");
        else if (data.cod == 200) {
          this.setState({
            forecastData: data,
            cityNameForecast: cityNameInput,
            updateDateForecast: updateDate
          });
        }
      });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row" />
              <div className="col-xs-8 form-container">
                <LargeDisplay
                  forecastData={this.state.forecastData} // return forecast data to large display
                  cityNameForecast={this.state.cityNameForecast}
                  updateDateForecast={this.state.updateDateForecast}
                  getForecast={this.forecastFiveDays} // let the list cities to have access to the forecast function
                />
              </div>
              <div className="col-xs-4 title-container">
                <ListCities
                  getWeather={this.getWeather}
                  cityName={this.state.cityName}
                  dt={this.state.dt}
                  temperature={this.state.temperature}
                  weatherStatus={this.state.weatherStatus}
                  getForecast={this.forecastFiveDays} // let the list cities to have access to the forecast function
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetWeather;
