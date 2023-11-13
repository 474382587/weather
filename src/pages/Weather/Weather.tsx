import "./Weather.less";
import { Component } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import { CITIES } from "../../constant";
import { convertToCelsius, getDayOfTheWeek } from "../../utils";
import Tabs from "../../components/Tabs";
import { Forecast, fetchRealTimeWeather } from "../../api/weather";

interface WeatherProps {
  title?: string
}

class Weather extends Component<
  WeatherProps,
  {
    currentTab: number;
    forecasts: Forecast[] | undefined;
    isLoading: boolean;
  }
> {
  state: {
    currentTab: number;
    forecasts: Forecast[] | undefined;
    isLoading: boolean;
  } = {
      currentTab: 0,
      forecasts: undefined,
      isLoading: false,
    };

  constructor(props: WeatherProps) {
    super(props);

    this.fetchAndUpdateForecast = this.fetchAndUpdateForecast.bind(this);
  }

  componentDidMount(): void {
    this.fetchAndUpdateForecast();
  }

  updateWeather(weatherForecastList: Forecast[]) {
    this.setState((prevState) => ({
      ...prevState,
      forecasts: weatherForecastList,
    }));
  }

  async fetchAndUpdateForecast(selectedTab: number = 0) {
    this.setState((prev) => ({
      ...prev,
      isLoading: true,
      forecasts: undefined,
      currentTab: selectedTab,
    }));

    const weatherForecastList = await fetchRealTimeWeather(
      CITIES[selectedTab].value,
    );

    if (weatherForecastList) {
      this.updateWeather(weatherForecastList);
    }

    this.setState((prevState) => ({ ...prevState, isLoading: false }));
  }

  renderTabContent() {
    const { forecasts } = this.state;
    if (forecasts) {
      return (
        <div className="weatherCardContainer">
          <div className="currentWeatherCard">
            <div className="day">Today</div>
            <div className="weatherCardContent">
              <div>
                <img
                  src={`assets/${forecasts[0].weather[0].icon}.png`}
                  title={forecasts[0].weather[0].description}
                />
              </div>
              <div>
                <div className="temp">
                  <span>{convertToCelsius(forecasts[0].temp.day)}</span>°
                </div>
                <div className="weather">{forecasts[0].weather[0].main}</div>
              </div>
            </div>
          </div>
          <div className="futureWeatherContainer">
            {forecasts.slice(1).map((forecast, index) => {
              if (index > 3) return null;

              return (
                <div className="futureWeatherCard" key={index}>
                  <div className="day">{getDayOfTheWeek(index + 1)}</div>
                  <div className="weather-icon">
                    <img
                      src={`assets/${forecast.weather[0].icon}.png`}
                      title={forecast.weather[0].description}
                    />
                  </div>
                  <div className="temp">
                    <span>{convertToCelsius(forecast.temp.day)}</span>°
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return <div>Nothing here</div>;
  }

  render() {
    const { currentTab, isLoading } = this.state;
    return (
      <div className="displayWrapper">
        <div className="contentWrapper">
          <Tabs
            tabs={CITIES}
            onSelect={this.fetchAndUpdateForecast}
            currentTab={currentTab}
          />
          {isLoading ? (
            <div className="loadingContainer">
              <LoadingIndicator />
            </div>
          ) : (
            this.renderTabContent()
          )}
        </div>
      </div>
    );
  }
}

export default Weather;
