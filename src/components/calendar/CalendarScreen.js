import React, { PureComponent } from "react";
import Popup from "reactjs-popup";
import "../../styles/calendar.scss";
import Header from "../Header";
import TimeLine from "./TimeLine";
import TimeConverter from "./TimeConverter";
import fire from "../fire.js";

class CalendarScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.db = fire.firestore();
    this.timeConverter = new TimeConverter();
    this.time_to = "09:00";
    this.time_from = "08:00";
    this.latest_date = new Date().toISOString().slice(0, 10);
    this.firebase_data = [];
    this.latest_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    this.latest_name = "unknown " + Math.random().toString(36).substring(7);
    this.state = {
      firebase_data: [[], [], [], [], []],
      time_from: "00:00",
      time_to: "18:00",
      latest_date: new Date(),
      latest_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      latest_name: Math.random().toString(36).substring(7),
    };
  }
  componentDidMount() {
    this.access_firebase_database();
  }

  async access_firebase_database() {
    let r = Math.random().toString(36).substring(7);
    const days = this.db.collection("meetings").doc("days");
    let dateArray = [];
    for (var i = 0; i < 5; i++) {
      var day = [];
      var someDate = new Date();
      someDate.setDate(someDate.getDate() + i);
      this.create_collection(someDate.toISOString().slice(0, 10));
      await days
        .collection(someDate.toISOString().slice(0, 10))
        .get()
        .then((data) => {
          console.log("firebase read:");
          data.forEach((doc) => {
            if (doc.data().name !== "RESERVED") {
              console.log("pushing data");
              console.log(doc.data());
              day.push(doc.data());
            }
          });
        });
      dateArray.push(day);
    }
    this.firebase_data = dateArray;
    this.setState({ firebase_data: dateArray });
    return dateArray;
  }
  async handleClick(e) {
    let date = this.latest_date;
    const obj = {
      time_from: this.time_from,
      time_to: this.time_to,
      key: Math.random(),
      url: this.latest_url,
      name: this.latest_name,
    };
    await this.firebase_write(date, obj);
    await this.access_firebase_database();
  }

  async firebase_write(dateCollection, dataObj) {
    const days = this.db.collection("meetings").doc("days");
    this.create_collection(dateCollection);
    await days.collection(dateCollection).doc(dataObj.name).set(dataObj);
  }

  async create_collection(dateString) {
    const days = this.db.collection("meetings").doc("days");
    days.collection(dateString).doc("dont read").set({ name: "RESERVED" });
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
      console.log(this.state.firebase_data);
      someDate.setDate(someDate.getDate() + i);
      let divVar = (
        <tr key={Math.random().toString()}>
          <TimeLine
            date={someDate.toISOString().slice(0, 10)}
            timeRange={this.state.firebase_data[i]}
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
                      console.log("that's the date : " + e.target.value);
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
                      //await this.access_firebase_database();
                      this.handleClick(e);
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
