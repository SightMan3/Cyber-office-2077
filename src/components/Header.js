import React, { PureComponent, ReactNode } from "react";
import "../styles/header.scss";

// components
import HeaderButton from "./home/HeaderButton";
import HeaderDropdown from "./home/HeaderDropdown";

import firebase from "./fire";

class Header extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      user_curr: "",
    };
  }

  sign_out = () => {
    firebase.auth().signOut();
    this.props.routeBack("/")
  }

  componentDidMount() {
    console.log(this.props)
  }



  render() {
    return (
      <div className="containerHeader">
        <button 
          className="signOut"
          onClick={this.sign_out}
        >
          <p>Sign Out</p>
        </button>
        <HeaderButton
          name="Profile"
          useremail={this.props.useremail}
          route={this.props.routeBack}
        />

        <HeaderButton
          name="Home"
          useremail={this.props.useremail}
          route={this.props.routeBack}
        />
        <HeaderButton
          name="Chat"
          route={this.props.routeBack}
          useremail={this.props.useremail}
        />
        <HeaderButton
          name="Calendar"
          route={this.props.routeBack}
          useremail={this.props.useremail}
        />
        <HeaderButton
          name="Cloud"
          route={this.props.routeBack}
          useremail={this.props.useremail}
        />
      </div>
    );
  }
}

export default Header;
