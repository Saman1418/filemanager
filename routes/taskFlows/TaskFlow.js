const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const date = firebase.firestore.FieldValue.serverTimestamp();


// ---------------AddtaskFlows------------------------------------//
router.post("/workFlows", async (req, res) => {
  let collectionRef = firestore.collection("workFlows");
  const taskFlowsData = {
  workFlowName:req.body.workFlowName,
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
    
    if((req.body.workflowId!=null ) ||(req.body.workflowId!=undefined )){
      let allWorkFlows = [];
      const fileDocument = await collectionRef.where('fileId', '==', taskFlowsData.fileId).get();
      fileDocument.docs.forEach((doc) => {
        allWorkFlows.push({ data: doc.data(), id: doc.id });
      });
      if(allWorkFlows.length!==0){
        allWorkFlows.forEach(async(workFlow)=> {
          if(workFlow.id==req.body.workflowId){
            console.log(taskFlowsData.taskName)
            const data = await collectionRef.doc(workFlow.id)
            let b = await data.update(
              {taskList: taskFlowsData.taskList,
              updated: new Date()}
              );
            res.status(200).send(`updated workflow `);
          }

        });
       
      }else{
        res.status(200).send(`No Matching Workflow`);
      }
    }
  
    else{
      const taskFlows = await collectionRef.add(taskFlowsData)
      // const data = await taskFlows.get();
      res.status(200).send(taskFlowsData);
    }
    
    // console.log("docs", data);
    

  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error creating task" });
  }
});




// ---------------getTaskFlows details-----------------------------
router.get("/getWorkFlows", async (req, res) => {
      let collectionRef = firestore.collection("workFlows");
      const queryObject = req.query;
        const fileId = queryObject["fileId"] ? queryObject["fileId"] : "";
        const docId = queryObject["docId"] ? queryObject["docId"] : "";
    
        
    
        if(fileId){
            collectionRef = collectionRef.where("fileId", "==", fileId);
            
        }
      
    
      try {
        let files;
        let allWorkFlows = [];
        if(docId){
         files = await collectionRef.doc(docId).get();
                 let allWorkFlows = [];
                 allWorkFlows.push({data:files.data()})
        }
        else{
        files = await collectionRef.get();
        files.docs.forEach((doc) => {
          allWorkFlows.push({ data: doc.data(), id: doc.id });
        });
        }
        
            
    
        // console.log("docs", data);
        res.status(200).send(allWorkFlows);
    
      } catch (e) {
        console.log(e);
        res.status(400).send({ message: "Error getting workFlows" });
      }
    
    });


    //----------------delete -----------------------------

router.delete("/workFlowsDelete/:id", async (req, res) => {
  const id = req.params.id;
  let collectionRef = firestore.collection("workFlows");

  try {
    await collectionRef.doc(id).delete();

    res.status(200).send("taskFlows Deleted");
  } catch (error) {
    res.status(401).send(error.message);
  }
});


//----------------------------update taskFlow------------------------------------

router.put("/workFlowsUpdate/:id", async (req, res) => {
  let collectionRef = firestore.collection("workFlows");
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
