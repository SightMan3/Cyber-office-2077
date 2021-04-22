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
        fire.auth().onAuthStateChanged((user) => {
            if (user != null) {
                if (this.props.name === "Chat") {
                    this.props.route({
                        pathname: `/${user.uid}/Selection`,
                        state: { useremail: user.uid }
                    })
                } else if (this.props.name === "Home") {
                    this.props.route({
                        pathname: `/${user.uid}/Home`,
                        state: { useremail: user.uid }
                    })
        
                } else if (this.props.name === "Cloud") {
                    this.props.route({
                        pathname: `/${user.uid}/Cloud`,
                        state: { useremail: user.uid }
                    })
        
                }else if (this.props.name === "Calendar") {
                    this.props.route({
                        pathname: `/${user.uid}/Calendar`,
                        state: { useremail: user.uid }
                    })
        
                }  else if (this.props.name === "Profile") {
                    this.props.route({
                        pathname: `/${user.uid}/Profile`,
                        state: { useremail: user.uid }
                    })
                }
            }
        })

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