import React, { PureComponent, ReactNode } from 'react'
import "../../styles/header.scss"

// components
import HeaderButton from "./HeaderButton";

import fire from "../fire"

class Header extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            user_curr: ""
        }
    }


    render() {
        return (
            <div className = "containerHeader">
                <div 
                    className="signOut"
                    onClick={() => { 
                        this.props.routeBack("/");
                        fire.auth().signOut();
                    }}
                >
                    <p>Sign out</p>
                </div>
                
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
                <HeaderButton name="Mail" />

            </div>
        )
    }
}

export default Header