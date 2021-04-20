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
            this.props.route({
                pathname: `/${this.props.useremail}/Selection`,
                state: { useremail: fire.auth().currentUser.uid }
            })
        } else if (this.props.name === "Home") {
            this.props.route({
                pathname: `/${this.props.useremail}/Home`,
                state: { useremail: fire.auth().currentUser.uid }
            })

        } else if (this.props.name === "Cloud") {
            this.props.route({
                pathname: `/${this.props.useremail}/Cloud`,
                state: { useremail: fire.auth().currentUser.uid }
            })

        }else if (this.props.name === "Calendar") {
            this.props.route({
                pathname: `/${this.props.useremail}/Calendar`,
                state: { useremail: fire.auth().currentUser.uid }
            })

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