import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDHdJJkCN4wgwnkoJxIVMkr_eXzUF0tjgI",
  authDomain: "resto-club.firebaseapp.com",
  databaseURL: "https://resto-club.firebaseio.com",
  projectId: "resto-club",
  storageBucket: "resto-club.appspot.com",
  messagingSenderId: "858263748729",
  appId: "1:858263748729:web:0b96b1289f0b22b116d4a8"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
