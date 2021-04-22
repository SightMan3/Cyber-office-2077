import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "../styles/services.scss";

import fire from "./fire"

class Servieces extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      gmail: false,
      meet: false,
      teams: false,
      zoom: false,
      jitsi: false,
      user_mail: ""
    };
  }

  buts_first_row = ["teams", "meet"]
  buts_second_row = ["zoom"]

  service_btn_gmail;
  service_btn_teams;
  service_btn_meet;
  service_btn_zoom;
  service_btn_jitsi;


  choosedService = (icon) => {
    switch (icon) {
      case "gmail":
        this.service_btn_gmail.setAttribute("disabled", "disabled");
        this.setState({ gmail: true });
        break;
      case "teams":
        this.service_btn_teams.setAttribute("disabled", "disabled");
        this.setState({ teams: true });
        break;
      case "meet":
        this.service_btn_meet.setAttribute("disabled", "disabled");
        this.setState({ meet: true });
        break;
      case "jitsi":
        this.service_btn_jitsi.setAttribute("disabled", "disabled");
        this.setState({ jitsi: true });
        console.log("jitsi")
        break;
      case "zoom":
        this.service_btn_zoom.setAttribute("disabled", "disabled");
        this.setState({ zoom: true });
        break;
    }
  }

  submit_choosed_service = async () => {

    fire.auth().onAuthStateChanged((user) => {
      if (user != null) {
        fire.firestore().collection(user.email).doc("services").set({ 
          teams: this.state.teams,
          meet: this.state.meet,
          zoom: this.state.zoom,
        })
        this.props.RouteBack(`/${fire.auth().currentUser.uid}/Home`)
      }
    })

  }

  validationEmail = (e) => {
    this.setState({
      user_mail: e.target.value
    })
    console.log(this.state.user_mail)
  }

  render() {
    return (
      <div className="section_services">
        <div className="services">
          <div className="title_services">
            <p className="title">Choose services<br /> you use for home office</p>
          </div>
          <div className="buttons_services">
            <div className="first_row">
              {this.buts_first_row.map((icon, i) => {
                return (

                  <button 
                    ref={(service_btn) => { 
                      if (icon === "gmail") {
                        this.service_btn_gmail = service_btn;
                      } else if (icon === "teams") {
                        this.service_btn_teams = service_btn;
                      } else if (icon === "meet") {
                        this.service_btn_meet = service_btn;
                      }
                    }}
                    className="btn" 
                    onClick={() => {this.choosedService(icon)}}
                  >
                      <div className={icon}></div>
                  </button>
                )
              })}
            
            </div>

            <div className="second_row">
              {this.buts_second_row.map((icon, i) => {
                return (
                  <button
                    ref={(service_btn) => {
                      if (icon === "zoom") {
                        this.service_btn_zoom = service_btn;
                      } else {
                        this.service_btn_jitsi = service_btn;
                      }
                    }} 
                    className="btn"
                    onClick={() => {this.choosedService(icon)}}
                  >
                      <div className={icon}></div>
                  </button>
                )
              })}
            </div>

          </div>
          <div className="submit_btn">
            <button 
              className="btn"
              onClick={this.submit_choosed_service}  
            >Confirm and continue</button>
            <button 
              className="btn-log-out"
              onClick={this.props.handleSignOut}  
              >log out</button>
          </div>
        </div>
        <div className="image_div">
          <div className="image_services"></div>
        </div>
      </div>
    );
  }
}

export default Servieces;
