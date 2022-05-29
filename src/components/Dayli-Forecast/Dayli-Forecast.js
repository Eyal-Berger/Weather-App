import React from "react";
import "./Dayli-Forecast.css";
import {convertToCelsius} from "../../utils/weather";
import {getDay} from "../../utils/weekDay";


class DayliForecast extends React.Component {



  render() {
  
    const {data, tempInCelsius } = this.props;

    const temp = tempInCelsius ? (convertToCelsius(data.Temperature.Maximum.Value) + "°C") : (data.Temperature.Maximum.Value) +  "℉";

      return (

      <div className="weatherDataBox">
        <h4>Day</h4>
        <p>{data.Day.IconPhrase}</p>
        <h4>Night</h4>
        <p>{data.Night.IconPhrase}</p>
        <p>{temp}</p>
        <p>{getDay(data.Date)}</p>
        <p><img typeof="float:Image" className="img-responsive" src={`https://developer.accuweather.com/sites/default/files/${data.Day.Icon >9 ?  data.Day.Icon : "0" + data.Day.Icon}-s.png`} width="75" height="45" alt="" title=""></img></p>
        <p>{new Date(data.Date).toLocaleDateString()}</p>
      </div>

      );
  }
}

export default DayliForecast; 