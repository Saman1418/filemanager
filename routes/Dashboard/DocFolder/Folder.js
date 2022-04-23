const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();




// ---------------AddUserFolder------------------------------------//
router.post("/addUserFolder", async (req, res) => {


var randomColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
//   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("docs");
  const docsData = {
        createdAt: new Date(),
        createdBy: req.body.createdBy,
        lastAccessed: new Date(),
        name: req.body.name,
        updatedAt: new Date(),
        path: [],
        parent: "",
        colour:req.body.colour,
        parentName:req.body.parentName
      
  }
  try {

    
    const folder = await collectionRef.add(docsData)
    const data = await folder.get();
    // console.log("docs", data);
    res.status(200).send(docsData);

  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error creating folder" });
  }
});


// ---------------getUserFolder------------------------------------//
router.get("/getUserFolder", async (req, res) => {
//   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("docs");
  const queryObject = req.query;
    const userId = queryObject["userId"] ? queryObject["userId"] : "";
    const ParentName = queryObject["ParentName"] ? queryObject["ParentName"] : "";

    if(userId){
        collectionRef = collectionRef.where("createdBy", "==", userId);  
    }

    if(ParentName){
      collectionRef = collectionRef.where("ParentName", "==", ParentName);
    }


  try {
    const getUserFolderData = await collectionRef.get();
    const allFolders = [];
    getUserFolderData.docs.forEach((doc) => {
      allFolders.push({ data: doc.data(), docId: doc.id });
    });

    // console.log("docs", data);
    res.status(200).send(allFolders);

  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error getting folder" });
  }

});

module.exports = router;

// const getUserFolderData = await collectionRef.get();
    // const fetchedHealthCamp = getUserFolderData.docs.map((doc) => {
    //     const id = doc.id;
    //     const data = doc.data();
  
    //     return { ...data, id };
    // })

    // const payload = {
    //     document: fetchedHealthCamp,
    //   };
