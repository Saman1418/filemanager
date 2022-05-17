const express = require("express");
// const port = process.env.PORT || 3000
// const compression = require('compression')
const fs = require("fs");
const gTTs = require("gtts");
const pdf = require("pdf-parse");
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const firebase = require("./firebase/FirebaseConfig");
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(fileUpload());
app.use("/", express.static("public"));

app.use(cors({ origin: true }));
app.use(bodyParser.json());

//--- Authantication Details ----
const LoginRoutes = require("./routes/authanticationApi/Login/login");
const SignUpRoutes = require("./routes/authanticationApi/Register/SignUp");

app.use(LoginRoutes);
app.use(SignUpRoutes);

//--- Docs folder Details ----
const DocsFolderRoutes = require("./routes/Dashboard/DocFolder/Folder");
app.use(DocsFolderRoutes);

//--- files Details ----
const FilesRoutes = require("./routes/Dashboard/Files/File");
app.use(FilesRoutes);

//--- Users Details ----
const UsersRoutes = require("./routes/Dashboard/Users/Users");
app.use(UsersRoutes);


//--- AudioBook ----
const AudioBookRoutes = require("./routes/audioBook/AudioBook");
app.use(AudioBookRoutes);







// Pdf to audio
// app.post("/addBook", async (req, res) => {
//   //   let collectionRef = firestore.collection("audioFiles");
//   const fileData = {
//     url: "https://firebasestorage.googleapis.com/v0/b/orgfilemanager.appspot.com/o/files%2FAbout%20Our%20Founder%20Q%20and%20A-converted.pdf",
//   };
//   try {
//     const file = fs.createWriteStream("sample.pdf");
//     // pdf("https://artisticyoga.s3.ap-southeast-1.amazonaws.com/The+Brain+That+Changes+Itself_+Stories+of+Personal+Triumph+from+the+Frontiers+of+Brain+Science+Small.pdf").then((data) => {
//     //   console.log(data.text)
//     var data;
//     var gtts = new gTTs("saman aggarwal", "en");
//     console.log("file", gtts);
//     console.log("before", new Date().toString());
//     gtts.save("sample.mp3", function (err, result) {
//       if (err) {
//         throw new Error(err);
//       }
//        data = {
//           status:false,
//       }
//       console.log("after", new Date().toString());
//       console.log("result", result);
//       console.log("Success!");
//     });
//     res.status(200).send(file);
//     // });
//     // const request = https.get(
//     //   "https://artisticyoga.s3.ap-southeast-1.amazonaws.com/The+Brain+That+Changes+Itself_+Stories+of+Personal+Triumph+from+the+Frontiers+of+Brain+Science+(+PDFDrive+).pdf",
//     //   function (response) {
//     //     response.pipe(file);
//     //     pdf("https://artisticyoga.s3.ap-southeast-1.amazonaws.com/The+Brain+That+Changes+Itself_+Stories+of+Personal+Triumph+from+the+Frontiers+of+Brain+Science+(+PDFDrive+).pdf").then((data) => {
//     //     //   console.log(data.text)
//     //       var gtts = new gTTs(data.text, "en");
//     //       gtts.save("sample.mp3", function (err, result) {
//     //         if (err) {
//     //           throw new Error(err);
//     //         }
//     //         console.log("Success!");
//     //       });
//     //       res.status(200).send("Successfully added");
//     //     });

//     //   }
//     // );
//     // let dataBuffer = fs.readFileSync(fileData.url);
//   } catch (e) {
//     console.log(e);
//     res.status(400).send({ message: "Error creating files" });
//   }
// });


app.get("/", function (req, res) {
  res.send("Node API");
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log("server started"));
