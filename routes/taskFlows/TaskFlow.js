const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();


// ---------------AddtaskFlows------------------------------------//
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
    let allFiles = [];
    const data1 = await collectionRef.where('fileId', '==', taskFlowsData.fileId).get();
    data1.docs.forEach((doc) => {
      allFiles.push({ data: doc.data(), docId: doc.id });
    });
    if(allFiles.length!==0){
      console.log(taskFlowsData.taskName)
      const data = await collectionRef.doc(allFiles[0].docId)
      let b = await data.update(
        {taskList: firebase.firestore.FieldValue.arrayUnion(taskFlowsData.taskList[0])}
        );
      res.status(200).send(`updated tasklist `);
    }
    else{
      const taskFlows = await collectionRef.add(taskFlowsData)
      const data = await taskFlows.get();
      res.status(200).send(taskFlowsData);
    }
    
    // console.log("docs", data);
    

  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error creating task" });
  }
});




// ---------------getTaskFlows details-----------------------------
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


    //----------------delete -----------------------------

router.delete("/taskFlowsDelete/:id", async (req, res) => {
  const id = req.params.id;
  let collectionRef = firestore.collection("taskFlows");

  try {
    await collectionRef.doc(id).delete();

    res.status(200).send("taskFlows Deleted");
  } catch (error) {
    res.status(401).send(error.message);
  }
});


//----------------------------update taskFlow------------------------------------

router.put("/taskFlowsUpdate/:id", async (req, res) => {
  let collectionRef = firestore.collection("taskFlows");
  const id = req.params.id;
  const name = req.body.name;

  try {
    await collectionRef.doc(id).update({name});

    res.status(200).send({id,name});
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;















// var now = new Date().valueOf();

// setTimeout(function () {

//     if (new Date().valueOf() - now > 100) return;

//     window.location = "https://itunes.apple.com/appdir";

// }, 25);

// window.location = "https://app.artisticyoga.com/availoffer/";
