import React, { PureComponent, ReactNode } from 'react'
import "../../styles/header.scss"
import HeaderButton from "./HeaderButton";

class Header extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className = "containerHeader">
                <div 
                className="signOut"
                >
                    <p>Sign out</p>
                </div>
                
                <HeaderButton name = "Home" />
                <HeaderButton name = "Chat" />
                <HeaderButton name = "Meetings" />
                <HeaderButton name = "Mail" />

            </div>
        )
    }
}

export default Header