import React, { PureComponent, ReactNode } from 'react'
import "../../styles/header.scss"
import HeaderButton from "./HeaderButton";
import HeaderDropdown from "./HeaderDropdown";
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
                
                <HeaderDropdown name = "Profile"/>
                
                <HeaderButton name = "Home" />
                <HeaderButton name = "Chat" />
                <HeaderButton name = "Meetings" />
                <HeaderButton name = "Mail" />

            </div>
        )
    }
}

export default Header