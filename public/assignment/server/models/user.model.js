"use strict";
var userArray = require("./user.mock.json");
var uuid = require("node-uuid");
var q = require("q");

module.exports = function(app, mongoose, db) {

    var userSchema = require("./user.schema.server.js")(mongoose);
    var userModel = mongoose.model("userModel", userSchema);

    userArray.forEach(function(element, index, array){
        var formatted = new userModel(element);
        Create(formatted);
    });

    //Create({"_id":123, "username":"alice", "password":"alice", "firstName":"Alice", "lastName":"Wonderland",
    //    "emails": ["student@student.com"], "phones":["123123123"]});
    //
    //var temp = {"_id":123, "username":"alice", "password":"alice", "firstName":"Alice", "lastName":"Wonderland",
    //    "emails": ["student@student.com"], "phones":["123123123"]};

    //var toInsert = new userModel(temp);
    //toInsert.save(function(err){
    //    if ( err ) throw err;
    //    console.log("User Saved Successfully");
    //});

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
        //user._id = uuid.v4();
        //userArray.push(user);
        //return userArray;
        var deferred = q.defer();
        user._id = uuid.v4();
        userModel.create(user, function(err, retVal){
            userModel.find(function(err, retVal){
                console.log("registering user...")
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
        //delete user._id;
        var condition = {_id : id};
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
        var condition = {username:username, password:password};

        userModel.findOne(condition, function(err, retVal){
            deferred.resolve(retVal);
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
