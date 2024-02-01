// ChatApp.js
import React, { useState, useEffect } from "react";
import firebase, { auth, firestore, timestamp } from "./firebase";

const ChatApp = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const messagesRef = firestore.collection("messages").orderBy("createdAt");
    const unsubscribe = messagesRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      await firestore.collection("messages").add({
        text: message,
        createdAt: timestamp(),
        user: user.displayName,
      });
      setMessage("");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={signOut}>Sign Out</button>
          <div>
            {messages.map((msg) => (
              <div key={msg.id}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};

export default ChatApp;
