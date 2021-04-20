import React, { PureComponent, ReactNode } from 'react'
import "../../styles/header-button.scss"
import fire from "../fire"

class HeaderButton extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            user_curr: ""
        }
    }

    clickMethod(){
        if (this.props.name === "Chat") {
            this.props.route(`/${this.props.useremail}/Selection`)
        } else if (this.props.name === "Home") {
            this.props.route(`/${this.props.useremail}/Home`)

        } else if (this.props.name === "Cloud") {
            this.props.route(`/${this.props.useremail}/Cloud`)

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