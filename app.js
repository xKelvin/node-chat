let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
// DAL
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-chat', { useNewUrlParser: true });

let app = express();

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))
//To parse json data
app.use(bodyParser.json())
app.use(cookieParser())

app.listen(3000);