import { red100 } from 'material-ui/styles/colors'
import React, { PureComponent } from 'react'
import "../../styles/profile.scss"
import fire from "../fire"

import Header from '../Header'

import im from "../../assets/nene_cpp.jpg"

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class Profile extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            uid: "",
            email: "",
            serv: [],
            profileURL: ""
        }
    }

    db = fire.firestore();
    storage = fire.storage("gs://cyberoffice2077.appspot.com/");


    imageToDatabse = (e) => {
        const storageref = this.storage.ref();


        fire.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const ref = storageref.child(`${user.email}/icon.jpg`)
                ref.put(e.target.files[0])
                    .then((snapshot) => {
                        ref.getDownloadURL()
                        .then((url) => {
                            console.log(url)
                            this.setState({
                                profileURL: url
                            })
                        })
                    })
            } else {
                alert("no user")
            }
        })
    }

    check_icon = () => {
        const storageref = this.storage.ref();


        fire.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const ref = storageref.child(`${user.email}/icon.jpg`)
                ref.getDownloadURL()
                    .then((url) => {
                        console.log(url)
                        this.setState({
                            profileURL: url
                        })
                    })
            } else {
                alert("no user")
            }
        })
    }

    getUserData = async () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.db.collection(user.email)
                    .doc("services")
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            let arr = [];
                            for (const key in doc.data()) {
                                const val = doc.data()[key];
                                if (val == true) {
                                   arr.push(key);
                                }
                            }
                            this.setState({ 
                                serv: arr
                            })
                            console.log(this.state.serv)
                        }
                    })


                this.db.collection(user.email)
                    .doc("data")
                    .get()
                    .then((res) => {
                        if (res.exists) {
                            this.setState({
                                name: res.data().name
                            })
                        } else {
                            this.setState({
                                name: "cant find user in database"
                            })
                        }
                    }).catch((err) => {
                        alert(err);
                    })
            } else {
                this.setState({
                    name: "user not found",
                })
            }
        })
    }

    add_services = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user != null) {
                
            } 
        })
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({
                    uid: user.uid,
                    email: user.email
                })
            } else {
                this.setState({
                    uid: "user not find",
                    email: "user not find"
                })
            }
        })

        this.getUserData()
        this.check_icon()

        
    }

    fileSelectedHandler(selectorFiles)
    {
        console.log(selectorFiles.target.files[0]);
    }

    serc_icon_style = "service_comp_icon teams"

    render() {
        return (
            <div>
                <Header 
                    routeBack={this.props.history.push}
                    useremail={this.state.uid}
                />
                <div className="profile-section">
                    <div 
                        className="profile_icon"
                        style={{ backgroundImage: `url(${this.state.profileURL})` }}
                    >
                        <div>
                            <label 
                                htmlFor="myInput"
                                className="file_input"    
                            ></label>
                            <input
                                id="myInput"
                                style={{display:'none'}}
                                type={"file"}
                                onChange={(e) => {this.imageToDatabse(e)}}
                            />
                        </div>
                    </div>
                    <div className="user_name" >{this.state.name}</div>
                    <div className="breakline"></div>
                    <div className="services_list">
                        <p className="title_ser">services</p>
                        {this.state.serv.map((name, i) => {
                            if (name === "teams") {
                                this.serc_icon_style = "service_comp_icon teams"
                            } else if (name === "meet") {
                                this.serc_icon_style = "service_comp_icon meet"
                            } else if (name === "zoom") {
                                this.serc_icon_style = "service_comp_icon zoom"
                            }

                            return (
                            <div className="service_comp">
                                <div className={name}></div>
                                <div className="breakline_smol"></div>
                                <div className="service_comp_service_text">
                                    <span>{name}</span>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <Popup trigger={
                        <button 
                            className="addServices"
                            onClick={this.add_services}
                        >
                            <p>add services</p>
                     </button>
                    } position="top center" className="popup">
                        <div className="services_btns">
                            <button className="btn">
                                    <div className="zoom"></div>
                            </button>
                            <button className="btn">
                                    <div className="teams"></div>
                            </button>
                            <button className="btn">
                                    <div className="meet"></div>
                            </button>

                            {/* <button className="btn">
                                    <div className="meet"></div>
                            </button> */}
                        </div>

                    </Popup>

                   

                    
                </div>
            </div>
        )
    }
}

export default Profile