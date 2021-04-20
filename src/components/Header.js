import React, { PureComponent, ReactNode } from "react";
import "../styles/header.scss";

// components
import HeaderButton from "./home/HeaderButton";
import HeaderDropdown from "./home/HeaderDropdown";

import fire from "./fire";

class Header extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      user_curr: "",
    };
  }

  render() {
    return (
      <div className="containerHeader">
        <HeaderDropdown name="Profile" route={this.props.routeBack} />

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
        <HeaderButton name="Meetings" />
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
