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

      const resp = {
        uid:loginUser.user.uid,
        name:loginUser.user.displayName,
        email:loginUser.user.email
      }

    
    const userData = await collectionRef.where("uid","==",loginUser.user.uid).get();
    // console.log("docs", userData.docs);
    res.status(200).send(resp);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Please check your login credentials" });
  }
});

module.exports = router;
