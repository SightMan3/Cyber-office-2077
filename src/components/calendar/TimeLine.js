import Popup from "reactjs-popup";
import React, { PureComponent } from "react";
import "../../styles/timeLine.scss";
import TimeConverter from "./TimeConverter";
class TimeLine extends PureComponent {
  constructor(props) {
    super(props);
    this.timeConverter = new TimeConverter();
    this.timeRange = props.timeRange;
    let length = props.timeRange.length;
    let objarr = [];
    for (let i = 0; i < props.timeRange.length; i++) {
      objarr.push({
        timeFrom: props.timeRange[i][0],
        timeTo: props.timeRange[i][1],
        url: props.timeRange[i][2],
        key: Math.random(),
      });
      console.log(objarr);
    }

    this.state = {
      timeRange: objarr,
    };
  }



  toPercentage(value, hundred) {
    return (value / hundred) * 100;
  }

  handleClick(e) {
    var key_of_pressed_element = e.target.getAttribute("custom-atribute");
    console.log(e.target.getAttribute("custom-atribute"));
    var temp = this.state.timeRange;
    let url = null;
    for (var i = 0; i < temp.length; i++) {
      console.log(temp[i].url);
      if (temp[i].key == key_of_pressed_element && temp[i].url !== null) {
        url = temp[i].url;
        break;
      }
    }
    this.openInNewTab(url);
  }
  openInNewTab(href) {
    Object.assign(document.createElement("a"), {
      target: "_blank",
      href: href,
    }).click();
  }

  getAllTimeStamps() {
    let returnCode = [];

    this.state.timeRange.forEach((element) => {
      console.log(element.timeFrom);
      let divVar = (
        <div>
          <Popup
            trigger={
              <button
                style={{
                  width:
                    ((this.timeConverter.timeStringToNumber(element.timeTo) -
                    this.timeConverter.timeStringToNumber(element.timeFrom)) /
                      1440) *
                      100 +
                    "%",
                  marginLeft:
                    this.toPercentage(
                      this.timeConverter.timeStringToNumber(element.timeFrom),
                      1440
                    ) + "%",
                }}
                className="loadingPart"
                key={element.key}
                custom-atribute={element.key}
              />
            }
            position="top center"
            className="popup"
          >
            <div className="input-container">
              <p className="popup-text">{element.timeFrom}</p>
              <p className="popup-text">{element.timeTo}</p>
              <button
                custom-atribute={element.key}
                className="create_room"
                onClick={(e) => {
                  this.handleClick(e);
                }}
              >
                join meeting
              </button>
            </div>
          </Popup>
        </div>
      );

      returnCode.push(divVar);
    });

    return returnCode;
  }

  componentDidMount() {
    this.setState({});
  }
  render() {
    return (
      <div className="containerOfLoadingBar">
        <div className="TimesContainer">
          <p className="TimeLineText">00:00</p>
          <p className="TimeLineText">02:00</p>
          <p className="TimeLineText">04:00</p>
          <p className="TimeLineText">06:00</p>
          <p className="TimeLineText">08:00</p>
          <p className="TimeLineText">10:00</p>
          <p className="TimeLineText">12:00</p>
          <p className="TimeLineText">14:00</p>
          <p className="TimeLineText">16:00</p>
          <p className="TimeLineText">18:00</p>
          <p className="TimeLineText">20:00</p>
          <p className="TimeLineText">22:00</p>
          <p className="TimeLineText">24:00</p>
        </div>
        <div className="loadingBarDiv">{this.getAllTimeStamps()}</div>
      </div>
    );
  }
}

export default TimeLine;
