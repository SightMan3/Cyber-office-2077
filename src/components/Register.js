import React, { 
    PureComponent, 
    ReactNode, 
} from 'react'
import "../styles/login.scss";
import fire from "./fire";
import { withRouter, RouteComponentProps } from "react-router-dom";

class Register extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            user_name: "",
            email_in: "",
            password_in: "",
            email_error: "",
            password_error: "",
            has_accout: false
        }
    }


    signUp = () => {
        fire
        .auth()
        .createUserWithEmailAndPassword(
            this.state.email_in, this.state.password_in
        ).catch(err => {
            switch (err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    this.setState({
                        email_error: err.message
                    })
                    break;
                case "auth/weak-password":
                    this.setState({
                        password_error: err.message
                    })
                    break;
            }
        })
    }

    route_to_register = () => {
        this.props.history.push("/login");
    }

    ddd = () => {
        console.log(this.state)
    }


    render() {
        return (
            <div className="section">
                <div className="image_div">
                    <div className="image"></div>
                </div>
                <div className="content">
                    <div className="titleTexts">
                        <p className="title">
                            Cyber Office <br /> 2077
                        </p>
                        <p className="undertitle">
                            wake up soldier <br />
                            we have emails to read
                        </p>
                    </div>
                    <div className="loginform">
                        <p id="authState">{
                            "Sign up"
                        }</p>

                        <input 
                            type="text" 
                            className="name"
                            placeholder="name"
                            onChange={(e) => {
                                this.setState({ 
                                    user_name: e.target.value 
                                })
                            }}
                        />
                        <input 
                            type="text" 
                            className="email"
                            placeholder="email"
                            onChange={(e) => {
                                this.setState({ 
                                    email_in: e.target.value 
                                })
                            }}
                        />
                        <input 
                            type="password" 
                            className="password"
                            placeholder="password"
                            onChange={(e) => {
                                this.setState({ 
                                    password_in: e.target.value
                                })
                            }}
                        />

                        <div className="submit_btns">

                            <button className="submit" onClick={this.route_to_register}>
                                log in
                            </button>
                            <button className="signup_in" onClick={this.signUp}>
                                <div className="done"></div>
                            </button>
                        </div>
                        <p className="or">or</p>
                        <button className="google">
                            <img 
                                className="google-icon" 
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            />
                            Google
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register