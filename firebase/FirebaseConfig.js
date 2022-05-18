
const firebase = require("firebase")

const firebaseConfig = {
  apiKey: "AIzaSyCPdRwqMogW4ykOaRlBVVDu46kMQOlIu34",
  authDomain: "orgfilemanager.firebaseapp.com",
  projectId: "orgfilemanager",
  storageBucket: "orgfilemanager.appspot.com",
  messagingSenderId: "1000255133338",
  appId: "1:1000255133338:web:e65063986c4ce0793a3123",
  measurementId: "G-8H4RM9HWGL"
};

// if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
// }

module.exports = firebase;



// taskFlows:[{
//   "taskName":"",
//   "id":,
//   "isActive":true,
//   "isDeleted":false,
//   "created":,
//   "updated":,
//    "taskList":[
//   {"users":[{id,name}],"action":""},
//   {"users":[],"action":""}
//          ]
//   }]
  