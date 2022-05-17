const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../firebase/FirebaseConfig");

const firestore = firebase.firestore();
const storage = firebase.storage();
const date = firebase.firestore.FieldValue.serverTimestamp();

const fs = require("fs");
const gTTs = require("gtts");
const pdf = require("pdf-parse");
const http = require("http");
const https = require("https");
const fileUpload = require("express-fileupload");

// app.use(fileUpload());

// ---------------getBook------------------------------------//
router.get("/getBook", async (req, res) => {
  let collectionRef = firestore.collection("addBooks");

  const queryObject = req.query;
  const docId = queryObject["docId"] ? queryObject["docId"] : "";

  if (docId) {
    collectionRef = collectionRef.where("docId", "==", docId);
  }

  try {
    const getBooks = await collectionRef.get();
    const allFolders = [];
    getBooks.docs.forEach((doc) => {
      allFolders.push({ data: doc.data(), docId: doc.id });
    });

    // console.log("docs", data);
    res.status(200).send(allFolders);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error getting books" });
  }
});

//--------------------------------- Pdf to audio--------------------------

router.post("/pdfToAudio", async (req, res) => {
  let collectionRef = firestore.collection("addBooks");
  let collectionRef1 = firestore.collection("addAudioBooks");

  const docsData = {
    name: req.body.name,
    docId: req.body.docId,
    url: req.body.url,
  };

  // console.log(docsData)
  try {
    const file = fs.createWriteStream("sample.pdf");
    collectionRef.doc(docsData.docId).update({
      audioFile: { status: "Creating..." },
    });
    pdf(docsData.url).then((data) => {
      // console.log("text",data.text);
      var gtts = new gTTs(data.text, "en");
      // console.log("file", gtts);
      console.log("before", new Date().toString());
      gtts.save("sample.mp3", function (err, result) {
        if (err) {
          throw new Error(err);
        }

        const fileFs = fs.readFileSync("sample.mp3");
        const uploadTask = storage
          .ref(`audioFiles/${docsData.name}`)
          .put(fileFs);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // console.log("snapshot");
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("audioFiles")
              .child(docsData.name)
              .getDownloadURL()
              .then((url) => {
                collectionRef.doc(docsData.docId).update({
                  audioFile: { status: "Created",audioUrl: url },
                });
                collectionRef1.add({
                  audioUrl: url,
                  audioFile: { status: "Created" },
                  name: docsData.name,
                  parentId:docsData.docId
                });
              });
          }
        );
        console.log("after", new Date().toString());
        console.log("Success!");
      });
      res.status(200).send("pdfToAudio");
    });
    
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error creating files" });
  }
});

// ---------------------getAudio---------------------------------
router.get("/getAudioBook", async (req, res) => {
  //   let collectionRef = firestore.collection("/FileManager/docs/data");
  let collectionRef = firestore.collection("audioBook");

  try {
    const getAudioBook = await collectionRef.get();
    const allFolders = [];
    getAudioBook.docs.forEach((doc) => {
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

// app.post("/extract-text", (req, res) => {
//     if (!req.files && !req.files.pdfFile) {
//         res.status(400);
//         res.end();
//     }

//     pdfParse(req.files.pdfFile).then(result => {
//         res.send(result.text);
//     });
// });

// let dataBuffer = fs.readFileSync("sample.pdf");
// pdf(dataBuffer).then((data)=>{
//     // console.log(data.text)
//     const gTTs = require("gtts");
//     var gtts = new gTTs(data.text,"en");
//     gtts.save('sample.mp3', function (err, result) {
//         if(err) { throw new Error(err) }
//         console.log('Success!');
//       });

// })

// });
// const request = https.get(
//   "https://artisticyoga.s3.ap-southeast-1.amazonaws.com/The+Brain+That+Changes+Itself_+Stories+of+Personal+Triumph+from+the+Frontiers+of+Brain+Science+(+PDFDrive+).pdf",
//   function (response) {
//     response.pipe(file);
//     pdf("https://artisticyoga.s3.ap-southeast-1.amazonaws.com/The+Brain+That+Changes+Itself_+Stories+of+Personal+Triumph+from+the+Frontiers+of+Brain+Science+(+PDFDrive+).pdf").then((data) => {
//     //   console.log(data.text)
//       var gtts = new gTTs(data.text, "en");
//       gtts.save("sample.mp3", function (err, result) {
//         if (err) {
//           throw new Error(err);
//         }
//         console.log("Success!");
//       });
//       res.status(200).send("Successfully added");
//     });

//   }
// );
// let dataBuffer = fs.readFileSync(fileData.url);
