/*
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
*/
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'demo-secret';
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var cookieParser = require('cookie-parser');
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var session = require('express-session');

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://localhost/cs5610spring2016';
var mongoose = require('mongoose');
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);

//Passport.js
console.log("session secret is: ");
console.log(process.env.SESSION_SECRET);
app.use(multer());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connection.on('connected', function() {
    console.log("Connected to database")
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

//initialize project models outside in order to pass model into serialize/deserialize function located
//in assignment model
var reservationModelProject = require("./public/project/server/models/reservation.model.js")(app, mongoose, db);
var userModelProject = require("./public/project/server/models/user.model.js")(app, mongoose, db);
require("./public/project/server/services/reservation.service.server.js")(app, reservationModelProject);
require("./public/project/server/services/user.service.server.js")(app, userModelProject);

require("./public/assignment/server/app.js")(app, mongoose, db, userModelProject);
//require("./public/project/compilebox/API/app.js")(app);
//require("./public/project/server/app.js")(app, mongoose);

app.get("/", function(req, res) {
    res.sendfile('index.html', {root: __dirname });
});

app.listen(port, ipaddress);