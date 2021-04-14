import React, { 
    PureComponent, 
    ReactNode, 
} from 'react'
import "../styles/login.scss";
import fire from "./fire";
import { withRouter, RouteComponentProps } from "react-router-dom";

import ServicesComp from "./servieces";

class Login extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            user_name: "",
            email_in: "",
            password_in: "",
            email_error: "",
            password_error: "",
            logged: true
        }


    }

    componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    logged: false
                })
            } else {
                this.setState({
                    logged: true
                })
            }
        })
    }


    clearCredentials = () => {
        this.setState({
            email_in: "",
            password_in: "",
        })
    }
    clearErrors = () => {
        this.setState({
            email_error: "",
            password_error: "",
        })
    }


    signIn = () => {
        this.clearCredentials();
        fire
        .auth()
        .signInWithEmailAndPassword(
            this.state.email_in, this.state.password_in
        ).then(res => {
            this.setState({
                logged: false
            })
        })
        .catch(err => {
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    this.setState({
                        email_error: err.message
                    })
                    console.log(this.state)
                    break;
                case "auth/wrong-password":
                    this.setState({
                        password_error: err.message
                    })
                    console.log(this.state)
                    break;
            }
        })

    }


    
    route_to_register = () => {
        this.clearCredentials();
        this.props.history.push("/register");
    }

    sign_out = () => {
        fire.auth().signOut();
        this.clearCredentials();
        console.log("sign out")     
    }


    render() {
        return (
            <div>
                {this.state.logged ? 
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
                                    this.state.logged ? "Sign up" : "Sign in"
                                }</p>
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
                                        sign up
                                    </button>
                                    <button className="signup_in" onClick={this.signIn}>
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
                    </div> :
                    <div>
                        <ServicesComp handleSignOut={this.sign_out}/>
                    </div>}
            </div>
        )
    }
}

export default Login