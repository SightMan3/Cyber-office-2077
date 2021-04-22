import React, { PureComponent } from "react";
import '../styles/nofound.scss';
class PathNotFoundScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    // return (
    //     <p>Hello</p>
    // )
    return(
    <div className="notFoundContainer">
      <div className="image_div">
        <div className="image"></div>
      </div>
      <div className="text_div">
          <p className="sadText">404 path not found :/</p>
      </div>
    </div>)
  }
}

export default PathNotFoundScreen;
