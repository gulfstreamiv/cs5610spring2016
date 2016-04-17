"use strict";
var userArray = require("./user.mock.json");
var uuid = require("node-uuid");
var q = require("q");

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, mongoose, db) {

    var userSchema = require("./user.schema.server.js")(mongoose);
    var userModel = mongoose.model("userModel", userSchema);

    userArray.forEach(function(element, index, array){
        //console.log(element);
        //var formatted = new userModel(element);
        Create(element);
    });

    var serviceType = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        //User model
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials
    };

    return serviceType;

    function Create(user){
        //console.log("Server side received:" + user);
        if(user.password) {
            console.log("hashing password for user " + user.username);
            user.password = bcrypt.hashSync(user.password);
            console.log("new password is: " + user.password);
        }
        else {
            user.password = bcrypt.hashSync(user.username);
        }
        var toInsert = {};
        for(var attribute in user){
            toInsert[attribute] = user[attribute];
        }
        //user._id = uuid.v4();
        //userArray.push(user);
        //return userArray;
        var deferred = q.defer();
        if(!toInsert._id) toInsert._id = uuid.v4();
        var formatted = new userModel(toInsert);
        userModel.create(formatted, function(err, retVal){
            userModel.find(function(err, retVal){
                console.log("registering user..." + user.username);
                deferred.resolve(retVal);
            });
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        userModel.find(function(err, retVal){
            deferred.resolve(retVal);
        });
        return deferred.promise;
        //return userArray;
    }

    function FindById(id){
        var deferred = q.defer();

        userModel.findById(id, function(err, retVal){
            deferred.resolve(retVal);
        });
        return deferred.promise;

        //for(var i = 0; i<userArray.length; i++){
        //    if(userArray[i]._id == id){
        //        return userArray[i];
        //    }
        //}
        //return null;
    }

    function Update(id, user){
        var condition = {_id : id};
        //check if need to update password
        userModel.findOne(condition, function(err, retVal) {
            if(user.password == retVal.password)
                delete user.password;
            else
                user.password = bcrypt.hashSync(user.password);
        });
        var deferred = q.defer();
        userModel.findOne(condition, function(err, retVal){
            if(err) deferred.reject(err);
            for(var attribute in user){
                retVal[attribute] = user[attribute];
            }
            retVal.save(function(err, retUser){
                userModel.find(function(err, userArray){
                    deferred.resolve(userArray);
                });
            });
        });
        return deferred.promise;
        //for(var i = 0; i<userArray.length; i++){
        //    if(userArray[i]._id == id){
        //        userArray[i].firstName = user.firstName;
        //        userArray[i].firstName = user.lastName;
        //        userArray[i].firstName = user.username;
        //        userArray[i].firstName = user.password;
        //    }
        //}
        //return userArray;
    }

    function Delete(id){
        var condition = {_id : id};

        var deferred = q.defer();

        userModel.remove(condition, function(err, retVal){
            if(err) {
                deferred.reject(err);
            }
            else {
                userModel.find(function(err, userArray) {
                    deferred.resolve(userArray);
                });
            }
        });

        return deferred.promise;
        //for(var i = 0; i<userArray.length; i++) {
        //    if (userArray[i]._id == id) {
        //        userArray.splice(i, 1);
        //    }
        //}
        //return userArray;
    }

    function findUserByUsername(username){
        var condition = {username : username};
        var deferred = q.defer();
        userModel.findOne(condition, function(err, retVal){
            deferred.resolve(retVal);
        });

        return deferred.promise;
        //for(var i = 0; i<userArray.length; i++) {
        //    if (userArray[i].username == username) {
        //        return userArray[i];
        //    }
        //}
        //return null;
    }

    function findUserByCredentials(username, password){
        var deferred = q.defer();
        //var hashedPassword = bcrypt.hashSync(password);
        console.log("validating user " + username);
        //console.log("hashed password is " + hashedPassword);
        var condition = {username:username};

        userModel.findOne(condition, function(err, retVal){
            if(!retVal) deferred.resolve(null);
            else if(bcrypt.compareSync(password, retVal.password))
                deferred.resolve(retVal);
            else
                deferred.resolve(null);
        });

        return deferred.promise;
        //for(var i = 0; i<userArray.length; i++) {
        //    if (userArray[i].username == username && userArray[i].password == password) {
        //        return userArray[i];
        //    }
        //}
        //return null;
    }
};
