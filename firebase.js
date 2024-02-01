// firebase.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYeCyT6o-bfaXjGp8Yv92Y56bVhGFFQLs",
  authDomain: "react-chat-app-26653.firebaseapp.com",
  projectId: "react-chat-app-26653",
  storageBucket: "react-chat-app-26653.appspot.com",
  messagingSenderId: "959077207965",
  appId: "1:959077207965:web:830c5ed6591b6b07d0a974",
  measurementId: "G-H82ENSHN21"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default firebase;
