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
      nameday: "None",
      loadingBarCount: 1,
      date: new Date().toLocaleDateString().replaceAll("/", ". "),
      uid: ""
    };
    this.my_func();
  }


  componentDidMount (){
    let currentComponent = this;
    fetch("https://api.abalin.net/today?country=sk&timezone=Europe%2FPrague").then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      var name = data.data.namedays.sk;
      currentComponent.setState({nameday: name.toString()})
    }).catch(function(err) {
      console.log("Error happened" +err);
    })

    fire.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          uid: user.uid
        })
      }
    })

  }

  my_func = () => {
    //console.log("adding one to"  + this.loadingWidth);
    let num = this.state.loadingBarCount + 0.01;
    this.setState({ loadingBarCount: num <= 100 ? num : 0 });

    setTimeout(this.my_func, 1);
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
            <p className="time">{new Date().toLocaleTimeString()}</p>
            <p className="date">{this.state.date}</p>
            <p className="nameDay"> nameday: {this.state.nameday}</p>
          </div>
          <div className="nameContainer">
            <p className="name">Cyber Office 2077</p>
          </div>
        </div>

        <div className="containerOfLoadingBar">
          <p className="loadingBar">Work to be done</p>

          <div className="loadingbarDiv">
            <div
              style={{ width: this.state.loadingBarCount + "%" }}
              className="loadingPart"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
