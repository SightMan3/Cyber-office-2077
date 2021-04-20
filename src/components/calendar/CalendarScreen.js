import React, { PureComponent } from "react";
import "../../styles/calendar.scss";
import Header from "../Header";
import TimeLine from "./TimeLine";

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

    this.state = {};
  }
  setAllDaysRandom() {
    let returnCode = [];
    for (let i = 0; i < 5; i++) {
      let divVar = (
        <tr>
          <TimeLine
            timeRange={[
              ["00:15", "05:45"],
              ["11:15", "12:45"],
              ["14:15", "20:45"],
            ]}
          />
        </tr>
      );
      returnCode.push(divVar);
    }

    return returnCode;
  }

  render() {
    return (
      <div className="calendarContainer">
        <Header
          routeBack={this.props.history.push}
          useremail={this.props.location.state.useremail}
        />

        <div className="CalendarButtonContainer">
          <div className="CalendarButton">
            <p className="CalendarButtonText"> Add Time Range</p>
          </div>
        </div>

        <div className="calendarBody">
          <table className="tableCalendar">
            <tr>
              <div>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Age</th>
              </div>
            </tr>

            {this.setAllDaysRandom()}
          </table>
        </div>
      </div>
    );
  }
}

export default CalendarScreen;
