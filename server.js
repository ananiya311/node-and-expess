/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/
 
var bGround = require('fcc-express-bground');
var myApp = require('./myApp');
var express = require('express');
var app = express();
require('dotenv').config()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.use("/public", express.static(__dirname + "/public"));
app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/views/index.html")
})
app.get('/json', (req, res)=>{
  var respons 
  if(process.env.MESSAGE_STYLE == "allCaps"){
    respons = "Hellow Json".toUpperCase()
  }else{
    respons = "Hellow Json"
  }
  res.json({"message": respons})
})

app.get("/now", (req, res, next)=>{
  req.time = new Date().toString()
  next()
},function(req,res){
  res.json({time: req.time})
})

app.get('/name', (req, res)=>{
  var {first:first, last:last} = req.query
  res.json({name:`${first} ${last}`})
})
// app.get("/name", function(req, res) {
//   var firstName = req.query.first;
//   var lastName = req.query.last;
//   res.json({
//     name: `${firstName} ${lastName}`
//   });
// });
app.post("/name",(req, res)=> {
  var string = req.body.first + " " + req.body.last;
  res.json({name:string});
});
if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

var port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function(){
  bGround.log('Node is listening on port '+ port + '...')
});

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

