import React, { Component } from "react";
import ListCities from "./listCities";

class LargeDisplay extends Component {
  refreshWeatherData = event => {
    this.props.getForecast(event);
  };

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var date = a.getDate();
    var weekDay = days[a.getDay()];
    let time = [date, weekDay];
    return time;
  }

  updateImageIcon = event => {
    return <img src={require("../img/" + event + "_.svg")} />;
  };

  render() {
    let { forecastData } = this.props;
    if (forecastData.city.name !== "") {
      return (
        <div>
          <div className="largeDisplay">
            <p className="btn btn-primary btn-lg cityName">
              {forecastData.city.name}
              <span className="forecastUpdate">
                (updated: {this.props.updateDateForecast})
              </span>
            </p>
            <button
              className="btn btn-primary btn-lg reload"
              onClick={() => {
                this.refreshWeatherData(this.props.cityNameForecast);
              }}
            >
              <img src={require("../img/reload.png")} />
            </button>

            <div className="forecastData">
              <div className="weatherImg">
                {this.updateImageIcon(forecastData.list[0].weather[0].main)}
              </div>
              <div className="currentData">
                <p className="btn btn-outline-warning inl">
                  Temperature: {forecastData.list[0].temp.day}
                </p>
                <p className="btn btn-outline-info inl">
                  Status: {forecastData.list[0].weather[0].main}
                </p>
                <p className="btn btn-outline-secondary inl">
                  Wind: {forecastData.list[0].speed} ms{" "}
                  {forecastData.list[0].deg} deg
                </p>
                <p className="btn btn-outline-secondary inl">
                  Pressure: {forecastData.list[0].pressure}
                </p>
              </div>
            </div>

            <div>
              <table>
                <tbody className="forecastTable">
                  <tr>
                    <td>
                      <p>{this.timeConverter(forecastData.list[1].dt)[0]}</p>
                      <p>{this.timeConverter(forecastData.list[1].dt)[1]}</p>
                    </td>
                    <td>
                      <p>{this.timeConverter(forecastData.list[2].dt)[0]}</p>
                      <p>{this.timeConverter(forecastData.list[2].dt)[1]}</p>
                    </td>
                    <td>
                      <p>{this.timeConverter(forecastData.list[3].dt)[0]}</p>
                      <p>{this.timeConverter(forecastData.list[3].dt)[1]}</p>
                    </td>
                    <td>
                      <p>{this.timeConverter(forecastData.list[4].dt)[0]}</p>
                      <p>{this.timeConverter(forecastData.list[4].dt)[1]}</p>
                    </td>
                    <td>
                      <p>{this.timeConverter(forecastData.list[5].dt)[0]}</p>
                      <p>{this.timeConverter(forecastData.list[5].dt)[1]}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {this.updateImageIcon(
                        forecastData.list[1].weather[0].main
                      )}
                    </td>
                    <td>
                      {this.updateImageIcon(
                        forecastData.list[2].weather[0].main
                      )}
                    </td>
                    <td>
                      {this.updateImageIcon(
                        forecastData.list[3].weather[0].main
                      )}
                    </td>
                    <td>
                      {this.updateImageIcon(
                        forecastData.list[4].weather[0].main
                      )}
                    </td>
                    <td>
                      {this.updateImageIcon(
                        forecastData.list[5].weather[0].main
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>{forecastData.list[1].temp.day}</td>
                    <td>{forecastData.list[2].temp.day}</td>
                    <td>{forecastData.list[3].temp.day}</td>
                    <td>{forecastData.list[4].temp.day}</td>
                    <td>{forecastData.list[5].temp.day}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="guideLine">
          <div className="card">
            <div className="card-body">
              <ol>
                <li>Type a city name and hit the + button</li>
                <li>
                  Click on the city listed below the search bar to see the 5
                  days forecast
                </li>
                <li>Click X to remove that city</li>
                <li>Click R to update information for that city</li>
                <li>Click Clear to clear all the list</li>
              </ol>
            </div>
          </div>
        </div>
      );
  }
}

export default LargeDisplay;
