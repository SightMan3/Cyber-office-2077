import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import fire from "../fire";

// assets
import triangle from "./triangle.svg";
import homeBackground from "../../assets/homeBackground.png";

// components
import Header from "../Header";

class Home extends PureComponent {
  static propTypes = {};

  loadingWidth = 50;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      nameday: "¯\\_(ツ)_/¯",
      loadingBarCount: 1,
      date: new Date().toLocaleDateString().replaceAll("/", ". "),
      uid: "",
      time: new Date().toLocaleTimeString(),
      finished: false,
      loading_time: 0.5, // hours
    };
  }

  componentDidMount() {
    let currentComponent = this;
    fetch("https://api.abalin.net/today?country=sk&timezone=Europe%2FPrague")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var name = data.data.namedays.sk;
        currentComponent.setState({ nameday: name.toString() });
      })
      .catch(function (err) {
        console.log("Error happened" + err);
      });

    fire.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          uid: user.uid,
        });
      }
    });
    this.time_update();
    this.my_func();
  }
  time_update = () => {
    this.setState({ time: new Date().toLocaleTimeString() });
    setTimeout(this.time_update, 1);
  };

  my_func = () => {
    //console.log("adding one to"  + this.loadingWidth);
    if (this.loading) {
      let num =
        this.state.loadingBarCount + 100 / (this.state.loading_time * 60);
      if (num >= 100) {
        this.setState({ finished: true });
      }
      this.setState({ loadingBarCount: num <= 100 ? num : 100 });
    }
    setTimeout(this.my_func, 6000);
  };

  sign_out = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <div className="container">
        <div className="headerDiv">
          <Header
            handleSignOut={this.sign_out}
            routeBack={this.props.history.push}
            useremail={this.state.uid}
          />
        </div>

        <div className="containerOfText">
          <div className="containerTime">
            <p className="time">{this.state.time}</p>
            <p className="date">{this.state.date}</p>
            <p className="nameDay"> nameday: {this.state.nameday}</p>
          </div>

          <div className="ImageContainerHome">

          </div>

          <div className="nameContainer">
            <p className="name">Cyber Office 2077</p>
          </div>
        </div>

        <div className="containerOfLoadingBar">
          <p style = {{color: "black", fontSize: "28px"}} className="loadingBar">Work to be done</p>

          <div className="loadingbarDiv">
            <div
              style={{ width: this.state.loadingBarCount + "%" }}
              className="loadingPart"
            ></div>
          </div>

          <button
            className="leave-button"
            onClick={async (e) => {
              this.setState({ loading: !this.state.loading });
            }}
          >
            <p className="ButtonText">
              {!this.state.loading ? "start" : "stop"}
            </p>
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
