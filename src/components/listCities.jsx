import React, { Component } from "react";

let pushData = false;
let isExist = false;
let numberOfCities = 8;
let isUpdate = false;

class ListCities extends Component {
  state = {
    cityList: [
      { cityName: "null", temperature: "null", weatherStatus: "null" }
    ],
    cityArray: [],
    checkForeCast: true
  };

  removeCity = index => {
    let array = this.state.cityList; // make a separate copy of the array
    array.splice(index, 1);
    this.state.cityList = array;
    pushData = false;
    this.forceUpdate();
  };

  clearList = () => {
    let array = [];
    this.state.cityList = array;
    pushData = false;
    this.forceUpdate();
  };

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ":" + min + ":" + sec;
    return time;
  }

  refreshWeatherData = event => {
    this.props.getWeather(event);
    isUpdate = true;
  };

  addDataToList() {
    let { cityName } = this.props;
    let { temperature } = this.props;
    let { weatherStatus } = this.props;
    let { cityList } = this.state;
    let { dt } = this.props;

    let cityInfo = {
      cityName: cityName,
      temperature: temperature,
      weatherStatus: weatherStatus,
      dt: this.timeConverter(dt)
    };

    // check to see if the city is exist in the list
    Object.keys(cityList).map(key => {
      let city = cityList[key];
      if (cityName == city.cityName) {
        isExist = true;
      }
    });

    pushData = true;

    if (!isExist) {
      if (cityList.length === numberOfCities) {
        this.removeCity(numberOfCities - 1);
      }
      cityList.unshift(cityInfo);
    }
  }

  updateFundction = () => {
    let { cityName } = this.props;
    let { temperature } = this.props;
    let { weatherStatus } = this.props;
    let { cityList } = this.state;
    let { dt } = this.props;

    Object.keys(cityList).map(key => {
      let city = cityList[key];
      if (cityName == city.cityName) {
        city.temperature = temperature;
        city.weatherStatus = weatherStatus;
        city.dt = dt;
      }
    });
    isUpdate = false;
  };

  render() {
    isExist = false;
    if (pushData) this.addDataToList();
    else pushData = true;
    if (isUpdate) {
      this.updateFundction();
    }

    let cityList = this.state.cityList; //original
    return (
      <div className="weather__info">
        <input
          id="cityName"
          name="cityName"
          type="text"
          placeholder="City,Country (e.g. halifax,ca)"
        />
        <button
          className="addBtn"
          onClick={() => {
            this.props.getWeather(document.getElementById("cityName").value);
          }}
        >
          +
        </button>

        {Object.keys(this.state.cityList).map(key => {
          let city = this.state.cityList[key];
          if (city.cityName !== "null" && city.cityName !== undefined) {
            return (
              <div className="listCities" key={key}>
                <div className="listRow">
                  <div>
                    <div
                      className="cityNameList"
                      onClick={() => {
                        this.props.getForecast(city.cityName);
                      }}
                    >
                      <span className="cityName">
                        <span className="updatedTime">
                          updated: {city.dt}
                          <br />
                        </span>
                        {city.cityName.toUpperCase()}
                      </span>
                      {"/"}
                      <span className="cityTemp">{city.temperature}</span>
                      {"/"}
                      <span className="cityStatus">{city.weatherStatus}</span>
                    </div>
                    <div className="btnList">
                      <span className="btnDelete">
                        <button
                          className="btn btn-danger btnRemove"
                          onClick={() => {
                            this.removeCity(key);
                          }}
                        >
                          X
                        </button>
                      </span>
                      <span className="btnUpdate">
                        <button
                          className="btn btn-primary btnRemove"
                          onClick={() => {
                            this.refreshWeatherData(city.cityName);
                          }}
                        >
                          <img src={require("../img/reload.png")} />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <button className="clearBtn" onClick={this.clearList}>
          Clear
        </button>
      </div>
    );
  }
}

export default ListCities;
