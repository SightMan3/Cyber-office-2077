import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import "../../styles/selection.scss"
import Lottie from 'react-lottie'
import animationData from "../../assets/animations/drawkit-grape-animation-4-LOOP.json"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// components
import Header from "../Header"

// firebase
import firebase from "../fire"

class Selection extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            createRoomValue: "",
            key: 0,
            uid: "",
            chatNames: [],
            chatKeys: []
        }
    }

    db = firebase.firestore();


    handleCreateRoomInput = (e) => {
        this.setState({
            createRoomValue: e.target.value,
            
        })
    }

    handleCreate = () => {
        let nums = []
        let the_num = 0
        for (let i = 0; i < 50; i += 1) {
            const six_digit = Math.floor(Math.random() * 100000) + 100000
            if (six_digit % 6 == 0) {
                nums.push(six_digit)
            }
            
        }
        
        the_num = nums[Math.floor(Math.random() * nums.length)]

        this.db.collection("chat")
            .doc(this.state.createRoomValue)
            .collection("messages")
            .doc()
            .set({
                message:  `welcome to ${this.state.createRoomValue} chat`,
                username: "cyberoffice2077",
                date: new Date()
            }).then(() => {
                this.props.history.push({
                    pathname: `/${firebase.auth().currentUser.uid}/Chat`,
                    state: { 
                        chatname: this.state.createRoomValue,
                        key: the_num,
                        useremail: firebase.auth().currentUser.email
                    }
                })   
            })


            
            this.db.collection("chat")
            .doc(this.state.createRoomValue)
            .set({
                key: the_num
            })

            const email = firebase.auth().currentUser.email
                            
            this.db.collection(email).doc().set({
                chatname: this.state.createRoomValue,
                key: the_num,
                isChat: true,
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
                                pathname: `/${firebase.auth().currentUser.uid}/Chat`,
                                state: { 
                                    chatname: this.state.createRoomValue,
                                    key: this.state.key,
                                    useremail: firebase.auth().currentUser.email
                                }
                            }) 

                            this.db.collection("chat").where("key", "==", chatkey)
                            .get()
                            .then((query) => {
                                query.forEach((doc) => { 
                                    firebase.auth().onAuthStateChanged((user) => {
                                        if (user != null) {
                                            this.db.collection(user.email).doc()
                                            .set({
                                                chatname: doc.id,
                                                key: chatkey,
                                                isChat: true,
                                            })
                                        }
                                    })
                                })
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

    getUsersChats = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.db.collection(user.email)
                    .where("isChat", "==", true)
                    .get()
                    .then((snap) => {
                        let keys = []
                        let chatnames = []
                        snap.forEach((doc) => {
                            keys.push(doc.data().key)
                            chatnames.push(doc.data().chatname)
                        })
                        this.setState({
                            chatKeys: keys,
                            chatNames: chatnames
                        })
                    })
            }
        })

    }
    
    
    joinRecentChat = (e) => {

        this.props.history.push({
            pathname: `/${firebase.auth().currentUser.uid}/Chat`,
            state: { 
                chatname: this.state.chatNames[e],
                key: this.state.chatKeys[e],
                useremail: firebase.auth().currentUser.email
            }
        }) 
    }

    componentDidMount () {
        this.getUsersChats();
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
                    <Header 
                        routeBack={this.props.history.push}
                        useremail={this.props.location.state.useremail}
                    />
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
                                {this.state.chatNames.map((name, i) => {
                                    return(
                                        <button 
                                            className="blob"
                                            onClick={(e) => {this.joinRecentChat(i)}}
                                            key={i}
                                            data-index={5}
                                        >
                                            <p className="chatname">{name}</p>
                                            <p className="chatname">{this.state.chatKeys[i]}</p>
                                        </button>
                                    )
                                })}
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