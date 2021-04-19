import React, { PureComponent, ReactNode } from 'react'
<<<<<<< HEAD:src/components/home/Header.js
import "../../styles/header.scss"

// components
import HeaderButton from "./HeaderButton";

import fire from "../fire"

=======
import "../styles/header.scss"
import HeaderButton from "./home/HeaderButton";
import HeaderDropdown from "./home/HeaderDropdown";
>>>>>>> 0d9936c5413d7dec04a668b1533f437c7cc70dc2:src/components/Header.js
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