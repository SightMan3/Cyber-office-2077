import React, { PureComponent } from "react";
import "../../styles/timeLine.scss";
class TimeLine extends PureComponent {
  constructor(props) {
    super(props);
    this.timeRange = props.timeRange;
    // console.log(props);
    // console.log(this.timeStringToNumber(props.timeRange[0]));
    // this.state = {
    //   timeFrom: this.timeStringToNumber(this.props.timeRange[0]),
    //   timeTo: this.timeStringToNumber(this.props.timeRange[1]),
    // };
  }

  timeStringToNumber(timeString) {
    return (
      parseInt(timeString.substring(0, 2) * 60) +
      parseInt(timeString.substring(3, 5))
    );
  }
  numToTimeString(num) {
    let hours = Math.floor(num / 60);
    let minutes = (num - hours * 60) * 100;

    hours = hours.toString().length < 2 ? "0" + hours : hours;
    minutes = minutes.toString().length < 2 ? minutes + "0" : minutes;
    return hours + ":" + minutes.toString().substring(0, 2);
  }

  toPercentage(value, hundred) {
    return (value / hundred) * 100;
  }

  getAllTimeStamps() {
    let returnCode = [];
    this.timeRange.forEach((element) => {
      let divVar = (
        <div
          style={{
            width:
              ((this.timeStringToNumber(element[1]) -
                this.timeStringToNumber(element[0])) /
                1440) *
                100 +
              "%",
            marginLeft:
              this.toPercentage(this.timeStringToNumber(element[0]), 1440) +
              "%",
          }}
          className="loadingPart"
        />
      );

      returnCode.push(divVar);
    });

    return returnCode;
  }
  render() {
    return (
      <div className="containerOfLoadingBar">
        <div className="TimesContainer">
          <p className="TimeLineText">06:00</p>
          <p className="TimeLineText">08:00</p>
          <p className="TimeLineText">10:00</p>
          <p className="TimeLineText">12:00</p>
          <p className="TimeLineText">14:00</p>
          <p className="TimeLineText">16:00</p>
          <p className="TimeLineText">18:00</p>
        </div>

        <div className="loadingBarDiv">{this.getAllTimeStamps()}</div>
      </div>
    );
  }
}

export default TimeLine;
