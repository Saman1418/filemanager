const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();

router.post("/taskFlows", async (req, res) => {
  let collectionRef = firestore.collection("taskFlows");
  const taskFlowsData = {
  taskName:req.body.taskName,
  fileId:req.body.fileId,
  isActive:true,
  isDeleted:false,
  createdAt: new Date(),
  updated: new Date(),
  //  taskList:[
  // // {users:[{id,email}],action:["view"],{id,email}],action:["view"]},
  // {"users":[{id,name}],"action":""},
  // {"users":[{id,name}],"action":""}
  //  ]
  taskList:req.body.taskList
  };
  try {
    const taskFlows = await collectionRef.add(taskFlowsData)
    const data = await taskFlows.get();
    // console.log("docs", data);
    res.status(200).send(taskFlowsData);

  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error creating task" });
  }
});





router.get("/getTaskFlows", async (req, res) => {
      let collectionRef = firestore.collection("taskFlows");
      const queryObject = req.query;
        const fileId = queryObject["fileId"] ? queryObject["fileId"] : "";
        const docId = queryObject["docId"] ? queryObject["docId"] : "";
    
        
    
        if(fileId){
            collectionRef = collectionRef.where("fileId", "==", fileId);
            
        }
      
    
      try {
        let files;
        let allFiles = [];
        if(docId){
         files = await collectionRef.doc(docId).get();
         allFiles.push({data:files.data()})
        }
        else{
        files = await collectionRef.get();
        files.docs.forEach((doc) => {
          allFiles.push({ data: doc.data(), docId: doc.id });
        });
        }
        
            
    
        // console.log("docs", data);
        res.status(200).send(allFiles);
    
      } catch (e) {
        console.log(e);
        res.status(400).send({ message: "Error getting taskFlows" });
      }
    
    });


module.exports = router;















// var now = new Date().valueOf();

// setTimeout(function () {

//     if (new Date().valueOf() - now > 100) return;

//     window.location = "https://itunes.apple.com/appdir";

// }, 25);

// window.location = "https://app.artisticyoga.com/availoffer/";
