import React, { PureComponent } from "react";
import Popup from "reactjs-popup";
import "../../styles/calendar.scss";
import Header from "../Header";
import TimeLine from "./TimeLine";
import TimeConverter from "./TimeConverter";
import fire from "../fire.js";

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
    this.db = fire.firestore();
    this.timeConverter = new TimeConverter();
    this.time_to = "18:00";
    this.time_from = "00:00";
    this.state = {
      time_from: "00:00",
      time_to: "18:00",
      latest_date: new Date(),
      latest_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      latest_name: Math.random().toString(36).substring(7),
    };
  }

  async access_firebase_database() {
    let r = Math.random().toString(36).substring(7);
    await this.db
      .collection("meetings")
      .doc("days")
      .collection(new Date().toISOString().slice(0, 10))
      .doc(r)
      .set({
        time_from: this.time_from,
        time_to: this.time_to,
        url: this.latest_url,
        meeting: this.latest_name,
      })
      .then(() => {
        console.log("Firebase write");
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  setAllDaysRandom() {
    let returnCode = [];
    for (let i = 0; i < 5; i++) {
      var someDate = new Date();
      someDate.setDate(someDate.getDate() + i);
      let divVar = (
        <tr key={Math.random().toString()}>
          <TimeLine
            date={someDate.toISOString().slice(0, 10)}
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
            {(close) => (
              <div>
                <div className="input-container">
                  <input
                    type="text"
                    className="name CalendarInputEl"
                    placeholder="Name for meeting"
                    onChange={(e) => {
                      this.setState({
                        latest_name: e.target.value,
                      });
                      this.latest_name = e.target.value;
                    }}
                  />
                  <input
                    type="time"
                    className="timeFromInput CalendarInputEl"
                    placeholder="time From"
                    value={this.time_from}
                    onChange={(e) => {
                      console.log("this is time from" + this.from);
                      this.setState({
                        time_from: e.target.value,
                      });
                      this.time_from = e.target.value;
                    }}
                  />
                  <input
                    type="time"
                    className="timeToInput CalendarInputEl"
                    placeholder="timeTo"
                    value={this.time_to}
                    onChange={(e) => {
                      this.setState({
                        time_to: e.target.value,
                      });
                      this.time_to = e.target.value;
                    }}
                  />
                  <input
                    type="date"
                    value={new Date().toISOString().slice(0, 10)}
                    min={new Date().toISOString().slice(0, 10)}
                    className="day CalendarInputEl"
                    placeholder="setDate"
                    onChange={(e) => {
                      this.setState({
                        latest_date: e.target.value,
                      });
                      this.latest_date = e.target.value;
                    }}
                  />
                  <input
                    type="text"
                    className="day CalendarInputEl"
                    placeholder="Enter URL to meeting"
                    onChange={(e) => {
                      this.setState({
                        latest_url: e.target.value,
                      });
                      this.latest_url = e.target.value;
                    }}
                  />
                  <button
                    className="create-time  CalendarInputEl"
                    onClick={async (e) => {
                      await this.access_firebase_database();
                      close();
                    }}
                  >
                    <p className="ButtonText">Create a new time</p>
                  </button>
                </div>
              </div>
            )}
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
