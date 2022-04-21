const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();

router.post("/SignUp", async (req, res) => {
  let collectionRef = firestore.collection("users");
  const SignupData = {
      email:req.body.email,
      password:req.body.password,
      name:req.body.name
  }
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(SignupData.email,SignupData.password );

    firebase.auth().currentUser.updateProfile({
      displayName: SignupData.name,
    });
    const newUser = {
      createdAt: date,
      //   docs: [],
      email: req.body.email,
      lastLogin: date,
      name: req.body.name,
      uid: user.user.uid,
      //   updatedAt: date,
    };
    const a = await collectionRef.add(newUser);
    // console.log("SignUpUser", user);
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Please check your Signup credentials" });
  }
});

module.exports = router;
