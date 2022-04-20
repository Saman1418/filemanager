const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();




// ---------------AddUserFile------------------------------------//
router.post("/addUserFile", async (req, res) => {
//   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("files");
  const fileData = {
    createdAt: new Date(),
    createdBy: req.body.createdBy,
    // data: data,
    name: req.body.name,
    parent: req.body.parent,
    updatedAt: new Date(),
    url: req.body.url,
    path: req.body.path,
    tags:req.body.tags
  }
  try {
    const files = await collectionRef.add(fileData)
    const data = await files.get();
    console.log("docs", data);
    res.status(200).send(data);

  } catch (e) {
    console.log(e);
    res.json({ message: "Error creating files" });
  }
});


// ---------------getUserFolder------------------------------------//
router.get("/getUserFile", async (req, res) => {
//   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("files");
  const queryObject = req.query;
    const userId = queryObject["userId"] ? queryObject["userId"] : "";
    const parentId = queryObject["parentId"] ? queryObject["parentId"] : "";
    const tags = queryObject["tags"] ? queryObject["tags"] : "";

    

    if(userId){
        collectionRef = collectionRef.where("createdBy", "==", userId);
        
    }
    
    if(parentId){
        collectionRef = collectionRef.where("parent", "==", parentId);
    }

    if(tags){
        collectionRef = collectionRef.where("tags", "==", tags);
    }
    
    




  try {
    const files = await collectionRef.get();
    const allFiles = [];
        files.docs.forEach((doc) => {
          allFiles.push({ data: doc.data(), docId: doc.id });
        });

    // console.log("docs", data);
    res.status(200).send(allFiles);

  } catch (e) {
    console.log(e);
    res.json({ message: "Error getting files" });
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