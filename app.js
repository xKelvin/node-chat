let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
// DAL
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-chat', { useNewUrlParser: true });

// Models
require('./models/room');
require('./models/user');

function handleError(req, res, statusCode, message){
    console.log();
    console.log('-------- Error handled --------');
    console.log('Request Params: ' + JSON.stringify(req.params));
    console.log('Request Body: ' + JSON.stringify(req.body));
    console.log('Response sent: Statuscode ' + statusCode + ', Message "' + message + '"');
    console.log('-------- /Error handled --------');
    res.status(statusCode);
    res.json(message);
};

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/rooms', require('./routes/rooms')(handleError));
app.use('/users', require('./routes/users')(handleError));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000);