import React, { PureComponent, ReactNode } from 'react'
import "../../styles/header-button.scss"
import fire from "../fire"

class HeaderButton extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    clickMethod(){
        if (this.props.name === "Chat") {
            this.props.route(`/${fire.auth().currentUser.uid}/Selection`)
        }
    }

    render() {
        return (
            <div 
            className="buttonContainer"
            onClick={() => {this.clickMethod()}}
            >
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default HeaderButton