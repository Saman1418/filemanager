
const firebase = require("firebase")

const firebaseConfig = {
  apiKey: "AIzaSyBzBv0o89Ytoje6JAMokFvgBP_oxGfLtEo",
  authDomain: "artistic-yoga-library.firebaseapp.com",
  projectId: "artistic-yoga-library",
  storageBucket: "artistic-yoga-library.appspot.com",
  messagingSenderId: "353148853074",
  appId: "1:353148853074:web:47d0bc21fa3127f399f88b",
  measurementId: "G-Y2T7QBQ8DW"
};

// if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
// }

module.exports = firebase;
