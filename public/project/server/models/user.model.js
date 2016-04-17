"use strict";
var userArray = require("./user.mock.json");
var feedbackArray = require("./feedback.mock.json");
var uuid = require("node-uuid");
var q = require("q");
var bcrypt = require("bcrypt-nodejs");

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

    feedbackArray.forEach(function(element, index, array){
        //console.log(element);
        //var formatted = new userModel(element);
        addFeedback(element);
    });

    var serviceType = {
        Create : Create,
        addFeedback : addFeedback,
        getFeedback : getFeedback,
        updateFeedback : updateFeedback,
        deleteFeedback : deleteFeedback,
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
        //hash password
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
        if(!toInsert._id) toInsert._id = new Date().getTime();
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
        if(!toInsert._id) toInsert._id = new Date().getTime();
        if(!toInsert.date) toInsert.date = new Date();
        var formatted = new feedbackModel(toInsert);
        feedbackModel.create(formatted, function(err, retVal){
            feedbackModel.find(function(err, retVal){
                console.log("creating feedback..." + toInsert._id);
                deferred.resolve(retVal);
            });
        });
        return deferred.promise;
    }

    function getFeedback(){
        var deferred = q.defer();
        feedbackModel.find(function(err, retVal){
            deferred.resolve(retVal);
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
            if(err) deferred.reject(err);
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

        //check if needed to update password
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

    function updateFeedback(id, feedback){
        //delete user._id;
        var condition = {_id : id};
        var deferred = q.defer();
        feedbackModel.findOne(condition, function(err, retVal){
            if(err) deferred.reject(err);
            for(var attribute in feedback){
                retVal[attribute] = feedback[attribute];
            }
            retVal.save(function(err, retUser){
                feedbackModel.find(function(err, userArray){
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

    function deleteFeedback(fid){
        var condition = {_id : fid};

        var deferred = q.defer();

        feedbackModel.remove(condition, function(err, retVal){
            if(err) {
                deferred.reject(err);
            }
            else {
                feedbackModel.find(function(err, feedbacks) {
                    deferred.resolve(feedbacks);
                });
            }
        });

        return deferred.promise;
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

    function FindByLocationField(field, location){
        var deferred = q.defer();
        var condition = {type:"tutor", field:field, location:location};

        userModel.find(condition, function(err, retVal){
            console.log(retVal);
            deferred.resolve(retVal);
        });

        return deferred.promise;
    }
};
