"use strict";
var userArray = require("./user.mock.json");
var uuid = require("node-uuid");
var q = require("q");

module.exports = function(app, mongoose, db) {

    var userSchema = require("./user.schema.server.js")(mongoose);
    var userModel = mongoose.model("userModel-Project", userSchema);

    var feedbackSchema = require("./feedback.schema.server.js")(mongoose);
    var feedbackModel = mongoose.model("feedbackModel-Project", feedbackSchema);

    userArray.forEach(function(element, index, array){
        //console.log(element);
        //var formatted = new userModel(element);
        Create(element);
    });

    var serviceType = {
        Create : Create,
        addFeedback : addFeedback,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        //User model
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        FindByLocationField : FindByLocationField
    };

    return serviceType;

    function Create(user){
        //console.log("Server side received:" + user);
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

    function addFeedback(feedback){
        var toInsert = {};
        for(var attribute in feedback){
            toInsert[attribute] = feedback[attribute];
        }
        var deferred = q.defer();
        if(!toInsert._id) toInsert._id = uuid.v4();
        var formatted = new feedbackModel(toInsert);
        feedbackModel.create(formatted, function(err, retVal){
            feedbackModel.find(function(err, retVal){
                console.log("creating feedback..." + feedback._id);
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

    function FindByLocationField(field, location){
        var deferred = q.defer();
        var condition = {type:"tutor", field:field, location:location};

        userModel.find(condition, function(err, retVal){
            deferred.resolve(retVal);
        });

        return deferred.promise;
    }
};
