import React, { PureComponent } from "react";
import "../../styles/header-dropdown.scss";
import "../../styles/header.scss"
import fire from "../fire"

class HeaderDropdown extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      shown: false,
      name: "",
      uid: "",
      email: ""
    };
  }

  clickMethod() {
    this.setState({ shown: !this.state.shown });
    console.log(this.state.shown);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user != null) {
          this.setState({
              name: user.displayName,
              uid: user.uid,
              email: user.email
          })
      } else {
          this.setState({
              name: "user not found",
              uid: "user not find",
              email: "user not find"
          })
      }
    })
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
                this.props.route({
                  pathname: `/${this.props.useremail}/Profile`,
                  state: { useremail: this.state.uid }
                })
              }}
            className="grid-item"
          
            >my profile</div>
            <div className="grid-item">something</div>
            <div className="grid-item">settings</div>

            <div 
                 className="grid-item"
                className="signOut"
                onClick={() => { 
                  this.props.route("/");
                  fire.auth().signOut();
                }}
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

// import React, { PureComponent } from "react";
// import "../../styles/header-dropdown.scss";
// import "../../styles/header.scss"
// import fire from "../fire"

// class HeaderDropdown extends PureComponent {
//   static propTypes = {};

//   constructor(props) {
//     super(props);

//     this.state = {
//       shown: false,
//     };
//   }

//   clickMethod() {
//     this.setState({ shown: !this.state.shown });
//     console.log(this.props.name);
//   }

//   render() {
//     return (
//       <div style={{height:"100%"}}>
//         <div
//           className="buttonContainer"
     
//           onClick={() => {
//             this.clickMethod();
//           }}
//         >
//           <p>{this.props.name}</p>
//         </div>
//         {this.state.shown ? (
//           <div className="dropdown-content">
//             <div 
//                onClick={() => {
//                 console.log("hello");
//               }}
//             className="grid-item"
          
//             >my profile</div>
//             <div className="grid-item">something</div>
//             <div className="grid-item">settings</div>

//             <div 
//                  className="grid-item"
//                 className="signOut"
//                 onClick={() => { 
//                   this.props.route("/");
//                   fire.auth().signOut();
//                 }}
//                 >
//                     <p>Sign out</p>
//                 </div>
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }

// export default HeaderDropdown;