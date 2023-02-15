import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link } from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyB1JULeCpn2bAtPZUQxgrq_xaWY-QpCiio",
  authDomain: "ootp-4cd4a.firebaseapp.com",
  databaseURL: "https://ootp-4cd4a-default-rtdb.firebaseio.com",
  projectId: "ootp-4cd4a",
  storageBucket: "ootp-4cd4a.appspot.com",
  messagingSenderId: "496535491346",
  appId: "1:496535491346:web:f0aa17e4fdab18d1fad9cb",
  measurementId: "G-XB0H99VVXG"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function Vp() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        db.collection("chats")
          .orderBy("createdAt")
          .onSnapshot((snapshot) => {
            setChats(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  ...doc.data(),
                };
              })
            );
          });
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTextSubmit = (event) => {
    event.preventDefault();
    db.collection("chats").add({
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
    });
    setText("");
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p>Please sign in to join the chat</p>
            <Link to="/Home"> clicke here</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-end">
        <div className="col-md-2">
          <button className="btn btn-danger" onClick={() => {  setUser(null)
                     
                      firebase.auth().signOut()}}>
            Sign Out
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {chats.map((chat) => (
            <div key={chat.id} className="card mb-3">
              <div className="card-body">
                <p className="card-text">{chat.text}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleTextSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Type a message..."
                value={text}
                onChange={handleTextChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Vp;
