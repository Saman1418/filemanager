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
//   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("docs");
  const docsData = {
        createdAt: new Date(),
        createdBy: req.body.createdBy,
        lastAccessed: new Date(),
        name: req.body.name,
        updatedAt: new Date(),
        path: req.body.path,
        parent: req.body.parent,
      
  }
  try {

    
    const folder = await collectionRef.add(docsData)
    const data = await folder.get();
    console.log("docs", data);
    res.status(200).send(data);

  } catch (e) {
    console.log(e);
    res.json({ message: "Error creating folder" });
  }
});


// ---------------getUserFolder------------------------------------//
router.get("/getUserFolder", async (req, res) => {
//   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("docs");
  const queryObject = req.query;
    const userId = queryObject["userId"] ? queryObject["userId"] : "";

    if(userId){
        collectionRef = collectionRef.where("createdBy", "==", userId);
        
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
    res.json({ message: "Error getting folder" });
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
