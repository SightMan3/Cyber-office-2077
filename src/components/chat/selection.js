import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import "../../styles/selection.scss"
import Lottie from 'react-lottie'
import animationData from "../../assets/animations/drawkit-grape-animation-4-LOOP.json"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// components
import Header from "../home/Header"

// firebase
import fire from "../fire"

class Selection extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            createRoomValue: "",
            key: 0,
        }
    }

    db = fire.firestore();


    handleCreateRoomInput = (e) => {
        this.setState({
            createRoomValue: e.target.value,

        })
    }

    handleCreate = () => {
        this.db.collection("chat")
            .doc(this.state.createRoomValue)
            .collection("messages")
            .doc()
            .set({
                message:  `welcome to ${this.state.createRoomValue} chat`,
                username: "cyberoffice2077",
                date: new Date()
            })

        let nums = []
        let the_num = 0
        for (let i = 0; i < 50; i += 1) {
            const six_digit = Math.floor(Math.random() * 100000) + 100000
            if (six_digit % 6 == 0) {
                nums.push(six_digit)
            }

        }

        the_num = nums[Math.floor(Math.random() * nums.length)]
        console.log(the_num)

        this.db.collection("chat")
            .doc(this.state.createRoomValue)
            .set({
                key: the_num
            })
    }

    handleJoin = (e) => {
        this.setState({ key: e.target.value });
    }
    
    routeToChat = () => {

        const chatkey = parseInt(this.state.key)

        if (this.state.key.toString().length == 6 && this.state.key % 6 == 0) {
            this.db.collection("chat").where("key", "==", chatkey)
                .get().then((doc) => {
                    doc.forEach(sdoc => {
                        if (sdoc.exists) {
                            this.props.history.push({
                                pathname: `/${fire.auth().currentUser.uid}/Chat`,
                                state: { 
                                    chatname: this.state.createRoomValue,
                                    key: this.state.key,
                                    useremail: fire.auth().currentUser.email
                                }
                            })   
                        } else {
                            alert("chat doesn't exists, \n plese contact crator for acsess key")
                        }
                    })
                })
           
        } else {
            alert(`wrong key`)
        }

    }

    render() {

        const animation_options = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        return (
            <div className="selection_section">
                <div className="sec_header">
                    <Header />
                </div>
                <div className="selection-main-content">
                    <div className="main">
                        <div className="titles">
                            <p className="title">Welcome to <br /> Chat</p>
                            <p className="under_title">chat with your colleagues <br />
                                classmates, friends
                            </p>
                            <p className="under_under_title">create or join room
                            </p>
                        </div>
                        <div className="Buttons_create_and_join">
                            <Popup trigger={
                                <button className="create_room">
                                    <p className="pb">create</p>
                                    <div className="create-icon"></div>
                                </button>
                            } position="top center" className="popup">
                                <div className="input-container">
                                    <p className="popup-text">please enter a name</p>
                                    <input 
                                        type="text" 
                                        className="create-room-input"
                                        onChange={(e) => {this.handleCreateRoomInput(e);}}
                                    />
                                    <button 
                                        className="create_room"
                                        onClick={this.handleCreate}
                                    >
                                        submit
                                    </button>
                                </div>
                            </Popup>
                            <p className="p-or">or</p>
                            <Popup trigger={
                                <button className="join_room">
                                    <div className="join-room-icon"></div>
                                </button>
                            } position="top center" className="popup">
                                <div className="input-container">
                                    <p className="popup-text">enter key to join</p>
                                    <input 
                                        type="text" 
                                        className="create-room-input"
                                        onChange={(e) => { this.handleJoin(e);}}
                                    />
                                    <button 
                                        className="create_room"
                                        onClick={this.routeToChat}
                                    >
                                        submit
                                    </button>
                                </div>
                            </Popup>
                        </div>
                        <div className="recent-chats">
                            <p className="recent-chats-title">recent chats</p>
                            <div className="recent-chat-blobs">
                                <button className="blob">{"dajaky nazov roomky"}</button>
                            </div>
                        </div>
                    </div>
                    <div className="chat_animation">
                        <Lottie 
                            options={animation_options}
                            height={600}
                            width={600}
                        />
                    </div>

                </div>

            </div>
        )
    }
}

export default Selection