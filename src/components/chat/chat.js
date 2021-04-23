import React, { useState, useEffect, Component, useRef } from "react";
import firebase from "../fire";
import "../../styles/chat.scss";

import Header from "../Header";

function Chat(props) {
  const [uid, setUid] = useState("");
  const [data, setData] = useState([]);
  const [inData, setInData] = useState("");
  const [user, setUser] = useState("");

  const [iconURL, setIconURL] = useState("");

  const [chatkey, setChatKey] = useState(0);
  const [chatName, setChatNameVar] = useState("");

  const [userChatKeys, setUserChatKeys] = useState([]);
  const [userChatNames, setUserChatNames] = useState([]);

  const messageEl = useRef(null);

  const db = firebase.firestore();
  const storage = firebase.storage();

  // let arr = [4, 5, 6, 78]
  // setData(arr);


  
  const getMessages = async (key) => {
    await db
      .collection("chat")
      .where("key", "==", key)
      .get()
      .then((query) => {
        let msgs = [];
        query.forEach((doc) => {
          doc.ref
            .collection("messages")
            .orderBy("date")
            .limitToLast(50)
            .onSnapshot((sub_doc) => {
              // get data
              const data = sub_doc.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              // update state
              setData(data);
            });
        });
      });
  };

  const write_messages = () => {
    if (inData === "") {
      alert("enter some text");
    } else {
      db.collection("chat")
        .where("key", "==", chatkey)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            doc.ref.collection("messages").doc().set({
              message: inData,
              date: new Date(),
              name: user,
            });
          });
        });

      setInData("");
    }
  };

  //176898

  const get_profilePic = async () => {
    const storageref = storage.ref();


    await firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
            const ref = storageref.child(`${user.email}/icon.jpg`)
            ref.getDownloadURL()
                .then((url) => {
                  setIconURL(url);
                  console.log(url)
                })
        } else {
            alert("no user")
        }
    })
  }

  const setChatName = (key) => {
    db.collection("chat").where("key", "==", key)
    .get()
    .then((query) => {
      query.forEach((doc) => {
        setChatNameVar(doc.id)
      })
    })
  }


  useEffect(() => {
    db.collection(props.location.state.useremail)
      .doc("data")
      .get()
      .then((res) => {
        if (res.exists) {
          console.log(res.data().name);
          setUser(res.data().name);
        } else {
          console.log("res doesn't exist'");
        }
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
          setUid(user.uid)
      } else {
         
      }
    })

    // setters
    setChatKey(parseInt(props.location.state.key));
    setChatName(parseInt(props.location.state.key))
    
    // getters
    get_profilePic(); 
    getMessages(parseInt(props.location.state.key));


  }, []);

  const getUsersChats = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
            db.collection(user.email)
                .where("isChat", "==", true)
                .get()
                .then((snap) => {
                    let keys = []
                    let chatnames = []
                    snap.forEach((doc) => {
                        keys.push(doc.data().key)
                        chatnames.push(doc.data().chatname)
                    })
                    setUserChatKeys(keys);
                    setUserChatNames(chatnames);
                })
        }
    })

  }

  
  const joinRecentChat = (e) => {
    console.log(userChatKeys[e])
    props.history.push({
        pathname: `/${firebase.auth().currentUser.uid}/Temp`,
        state: { 
            chatname: userChatNames[e],
            key: userChatKeys[e],
            useremail: firebase.auth().currentUser.email
        }
    }) 
}

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }

    getUsersChats();
  }, [])

  

  return (
    <div>
      <Header 
        routeBack={props.history.push} 
        useremail={uid}  
      />
      <div className="chat-section">
        <div className="chat-list">
          <div className="chat-code">
            key for this chat is: <br />
            <p id="key">{chatkey}</p>
          </div>
          <div className="breakline"></div>
          <div className="connect_cards">
            {userChatNames.map((name, i) => {
              return (
                <button 
                  className="card" 
                  key={i}
                  onClick={() => {joinRecentChat(i)}}
                >
                  <p className="chatName">{name}</p>
                  <div className="breakline_smol"></div>
                  <p className="chatKey">{userChatKeys[i]}</p>
                </button>
              )
            })}

          </div>
        </div>
        <div className="chat-view">
          <div className="messages-view" ref={messageEl}>
            <div>
              {data &&
                data.map((msg, i) => {
                  return (
                    <div key={i}>
                      <div
                        className={
                          msg.name == user
                            ? "user-data-current"
                            : "user-data-not-current"
                        }
                      >
                        {/* <div>{msg.date}</div> */}
                        <div>{msg.name}</div>
                      </div>
                      <div className="message-content">
                        <div
                          className={
                            msg.name == user ? "current" : "not-current"
                          }
                        >
                          <div className="message-text">
                            <p className="message-text-text">
                              {msg.name == user
                                ? `${msg.message}`
                                : `${msg.message}`}
                            </p>
                          </div>
                          <div className="icon-view">
                            <div 
                              className="icon"
                              style={{ backgroundImage: `url(${iconURL})` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            
          </div>
          <div className="usercontrols">
            <input
              type="text"
              onChange={(e) => {
                setInData(e.target.value);
              }}
              value={inData}
              className="message_in"
            />
            <button onClick={write_messages} className="send_btn">
              <div className="send_icon"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
