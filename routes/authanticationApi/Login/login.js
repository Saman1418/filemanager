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
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const loginUser = await firebase
      .auth()
      .signInWithEmailAndPassword(LoginData.email, LoginData.password);

    const resp = {
      uid: loginUser.user.uid,
      name: loginUser.user.displayName,
      email: loginUser.user.email,
    };

    // const userData = await collectionRef.where("uid","==",loginUser.user.uid).get();
    // console.log("docs", userData.data)
    // const aa = userData.data()

    const unsub = collectionRef
      .where("uid", "==", loginUser.user.uid)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          console.log(doc.data());
          documents.push({ ...doc.data(), id: doc.id });
        });
        res.status(200).send({ documents });
      });
    // res.status(200).send({ data: resp, aa });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Please check your login credentials" });
  }
});

module.exports = router;
