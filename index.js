const express = require('express')
// const port = process.env.PORT || 3000
// const compression = require('compression')
const bodyParser = require("body-parser");
var cors = require("cors");
const firebase = require("./firebase/FirebaseConfig");
const app = express()
app.use(express.urlencoded())
app.use(express.json());


app.use(cors({origin:true}));
app.use(bodyParser.json());




//--- Authantication Details ----
const LoginRoutes = require('./routes/authanticationApi/Login/login')
const SignUpRoutes = require('./routes/authanticationApi/Register/SignUp')

app.use(LoginRoutes)
app.use(SignUpRoutes)


//--- Docs folder Details ----
const DocsFolderRoutes = require('./routes/Dashboard/DocFolder/Folder')
// const SignUpRoutes = require('./routes/authanticationApi/Register/SignUp')

app.use(DocsFolderRoutes)
// app.use(SignUpRoutes)



//--- files Details ----
const FilesRoutes = require('./routes/Dashboard/Files/File')
// const SignUpRoutes = require('./routes/authanticationApi/Register/SignUp')

app.use(FilesRoutes)
// app.use(SignUpRoutes)



app.get('/', function(req, res) {
    res.send('Node API');
});


const PORT = process.env.PORT || 2000;

app.listen(PORT,()=>console.log("server started"));