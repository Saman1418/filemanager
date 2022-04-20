const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();



router.post("/Login", async (req, res) => {
  let collectionRef = firestore.collection("users");
  const LoginData = {
      email:req.body.email,
      
      password:req.body.password,
  }
  try {
    const loginUser = await firebase
      .auth()
      .signInWithEmailAndPassword(LoginData.email,LoginData.password);

    
    const userData = await collectionRef.where("uid","==",loginUser.user.uid).get();
    // console.log("docs", userData.docs);
    res.status(200).send(userData.docs);
  } catch (e) {
    console.log(e);
    res.json({ message: "Error creating login" });
  }
});

module.exports = router;
