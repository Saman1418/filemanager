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
        // parent: "",
        color:req.body.color,
        parent:req.body.parent
      
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


// ---------------getUsers------------------------------------//
router.get("/Users", async (req, res) => {
//   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("users");
//   const queryObject = req.query;
//     const userId = queryObject["userId"] ? queryObject["userId"] : "";
//     const parent = queryObject["parent"] ? queryObject["parent"] : "";

//     if(userId){
//         collectionRef = collectionRef.where("createdBy", "==", userId);  
//     }

//     if(parent){
//       collectionRef = collectionRef.where("parent", "==", parent);
//     }


  try {
    const getUsers = await collectionRef.get();
    const allUsers = [];
    getUsers.docs.forEach((doc) => {
        allUsers.push({ data: doc.data(), docId: doc.id });
    });

    // console.log("docs", data);
    res.status(200).send(allUsers);

  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error getting Users" });
  }

});

//----------------delete -----------------------------

router.delete("/deleteUserFolder/:id", async (req, res) => {
  const id = req.params.id;
  let collectionRef = firestore.collection("docs");

  try {
    await collectionRef.doc(id).delete();

    res.status(200).send("Folder Deleted");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

//----------------------------update Users------------------------------------

router.put("/Users/:id", async (req, res) => {
    let collectionRef = firestore.collection("users");
    const id = req.params.id;
    const isAdmin = req.body.isAdmin;
  
    try {
      await collectionRef.doc(id).update({isAdmin});
  
      res.status(200).send({id,isAdmin});
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

module.exports = router;

