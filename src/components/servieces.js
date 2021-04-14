import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import "../styles/services.scss"

class Servieces extends PureComponent {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
      <div className="section_services">
        
        <div className="services">
          <div className="title_services"></div>
          <div className="buttons_services"></div>
          <div className="submit_btn"></div>
        </div>
        <div className="image_div">
          <div className="image_services"></div>
        </div>
      </div>
    )
  }
}

export default Servieces