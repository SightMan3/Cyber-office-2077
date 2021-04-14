import React, { PureComponent, ReactNode } from 'react'
import "../../styles/header-button.scss"

class HeaderButton extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    clickMethod(){
        console.log(this.props.name);
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