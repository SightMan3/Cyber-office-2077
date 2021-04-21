import React, { PureComponent } from "react";
import Popup from "reactjs-popup";
import "../../styles/calendar.scss";
import Header from "../Header";
import TimeLine from "./TimeLine";
import TimeConverter from "./TimeConverter";
const rangeStrings = [
  ["00:15", "01:45"],
  ["2019-03-05 09:00", "2019-03-05 10:30"],
  ["2019-03-06 22:00", "2019-03-06 22:30"],
  ["2019-03-07 01:30", "2019-03-07 03:00"],
  ["2019-03-07 15:30", "2019-03-07 10:00"],
  ["2019-03-08 12:30", "2019-03-08 01:30"],
  ["2019-03-09 22:00", "2019-03-09 23:59"],
];

class CalendarScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.timeConverter = new TimeConverter();
    this.state = {};
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  setAllDaysRandom() {
    let returnCode = [];
    for (let i = 0; i < 5; i++) {
      let divVar = (
        <tr key={Math.random().toString()}>
          <TimeLine
            timeRange={[
              [
                this.timeConverter.numToTimeString(this.getRandomInt(50, 400)),
                this.timeConverter.numToTimeString(this.getRandomInt(400, 660)),
                "https://www.youtube.com/watch?v=oTl5Zopx4os",
              ],
              [
                this.timeConverter.numToTimeString(this.getRandomInt(660, 700)),
                this.timeConverter.numToTimeString(
                  this.getRandomInt(750, 1000)
                ),
                "https://meet.google.com/jen-xrau-xos",
              ],
              [
                this.timeConverter.numToTimeString(
                  this.getRandomInt(1100, 1200)
                ),
                this.timeConverter.numToTimeString(
                  this.getRandomInt(1200, 1400)
                ),
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              ],
            ]}
            key={Math.random().toString()}
          />
        </tr>
      );
      returnCode.push(divVar);
    }

    return returnCode;
  }

  handleClick(e) {}

  render() {
    return (
      <div className="calendarContainer">
        <Header
          routeBack={this.props.history.push}
          useremail={this.props.location.state.useremail}
        />

        <div className="CalendarButtonContainer">
          <Popup
            trigger={
              <button className="CalendarButton">
                <p className="CalendarButtonText"> Add Time Range</p>
              </button>
            }
            position="bottom center"
            className="popup"
          >
            <div className="input-container">
              <input
                type="time"
                className="timeFromInput"
                placeholder="time From"
                onChange={(e) => {
                  this.setState({
                    email_in: e.target.value,
                  });
                  this.email = e.target.value;
                }}
              />
              <input
                type="time"
                className="timeToInput"
                placeholder="timeTo"
                onChange={(e) => {
                  this.setState({
                    password_in: e.target.value,
                  });
                }}
              />
              <input
                type="date"
                className="day"
                placeholder="setDate"
                onChange={(e) => {
                  this.setState({
                    email_in: e.target.value,
                  });
                  this.email = e.target.value;
                }}
              />
              <button
                className="create_room"
                onClick={(e) => {
                  this.handleClick(e);
                }}
              >
                Create Time
              </button>
            </div>
          </Popup>
        </div>

        <div className="calendarBody">
          <table className="tableCalendar">{this.setAllDaysRandom()}</table>
        </div>
      </div>
    );
  }
}

export default CalendarScreen;
