const express = require('express')
// const port = process.env.PORT || 3000
// const compression = require('compression')
const fs = require("fs");
const gTTs = require("gtts");
const pdf = require("pdf-parse");
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
var cors = require("cors");
const firebase = require("./firebase/FirebaseConfig");
const app = express()
app.use(express.urlencoded())
app.use(express.json());
// app.use(fileUpload());



app.use(cors({origin:true}));
app.use(bodyParser.json());




//--- Authantication Details ----
const LoginRoutes = require('./routes/authanticationApi/Login/login')
const SignUpRoutes = require('./routes/authanticationApi/Register/SignUp')

app.use(LoginRoutes)
app.use(SignUpRoutes)


//--- Docs folder Details ----
const DocsFolderRoutes = require('./routes/Dashboard/DocFolder/Folder')
app.use(DocsFolderRoutes)



//--- files Details ----
const FilesRoutes = require('./routes/Dashboard/Files/File')
app.use(FilesRoutes)



//--- Users Details ----
const UsersRoutes = require('./routes/Dashboard/Users/Users')
app.use(UsersRoutes)



// Pdf to audio 

// app.post("/addAudioFile", async (req, res) => {
//     //   let collectionRef = firestore.collection("audioFiles");
//       const fileData = {
//         url:req.body.url,
//         file:req.body.file
//       }
//       try {
//         let dataBuffer = fs.readFileSync(fileData.file);
//         pdf(dataBuffer).then((data)=>{
//             // console.log(data.text)
//             var gtts = new gTTs(data.text,"en");
//             gtts.save('sample.mp3', function (err, result) {
//                 if(err) { throw new Error(err) }
//                 console.log('Success!');
//               });
//         })
//         res.status(200).send("Successfully added");
    
//       } catch (e) {
//         console.log(e);
//         res.status(400).send({ message: "Error creating files" });
//       }
//     });



    
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

app.get('/', function(req, res) {
    res.send('Node API');
});


const PORT = process.env.PORT || 2000;

app.listen(PORT,()=>console.log("server started"));