import React, { PureComponent } from 'react'
import fire from "../fire"

class Temp extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.props.history.push({
                    pathname: `/${user.uid}/Chat`,
                    state: { 
                        chatname: this.props.location.state.chatname,
                        key: this.props.location.state.key,
                        useremail: user.email
                    }
                }) 
            }    
        })

    }

    render() {
        return (
            <div>wait</div>
        )
    }
}

export default Temp