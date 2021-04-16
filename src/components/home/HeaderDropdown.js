import React, { PureComponent } from "react";
import "../../styles/header-dropdown.scss";
import "../../styles/header.scss"
class HeaderDropdown extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      shown: false,
    };
  }

  clickMethod() {
    this.setState({ shown: !this.state.shown });
    console.log(this.props.name);
  }

  render() {
    return (
      <div style={{height:"100%"}}>
        <div
          className="buttonContainer"
     
          onClick={() => {
            this.clickMethod();
          }}
        >
          <p>{this.props.name}</p>
        </div>
        {this.state.shown ? (
          <div className="dropdown-content">
            <div 
               onClick={() => {
                console.log("hello");
              }}
            class="grid-item"
          
            >my profile</div>
            <div class="grid-item">something</div>
            <div class="grid-item">settings</div>

            <div 
                 className="grid-item"
                className="signOut"
                >
                    <p>Sign out</p>
                </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HeaderDropdown;
