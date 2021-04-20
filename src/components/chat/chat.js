import React, { useState, useEffect, Component } from "react";
import fire from "../fire";
import "../../styles/chat.scss";

import Header from "../Header";

function Chat(props) {
  const [chatName, setChatName] = useState("");
  const [data, setData] = useState([]);
  const [inData, setInData] = useState("");
  const [user, setUser] = useState("");

  const [chatkey, setChatKey] = useState(0);

  const db = fire.firestore();

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

    setChatKey(parseInt(props.location.state.key));

    getMessages(parseInt(props.location.state.key));
  }, []);

  return (
    <div>
      <Header routeBack={props.history.push} />
      <div className="chat-section">
        <div className="chat-list">
          <div className="chat-code">
            key for this chat is: <br />
            <p id="key">{chatkey}</p>
          </div>
          <div className="breakline"></div>
        </div>
        <div className="chat-view">
          <div className="messages-view">
            <div>
              {data &&
                data.map((msg, i) => {
                  return (
                    <div>
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
                            <div className="icon"></div>
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
