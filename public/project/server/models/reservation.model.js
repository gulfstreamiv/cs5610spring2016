"use strict";
var reservationArray = require("./reservation.mock.json");
var uuid = require("node-uuid");
var q = require("q");

module.exports = function(app, mongoose, db) {

    var reservationSchema = require("./reservation.schema.server.js")(mongoose);
    var reservationModel = mongoose.model("reservationModel-Project", reservationSchema);

    reservationArray.forEach(function(element, index, array){
        //console.log(element);
        //var formatted = new userModel(element);
        Create(element);
    });

    var serviceType = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        FindByStudentId : FindByStudentId,
        FindByTutorId : FindByTutorId,
        Update : Update,
        Delete : Delete
    };

    return serviceType;

    function Create(reservation){
        //console.log("Server side received:" + user);
        var toInsert = {};
        for(var attribute in reservation){
            toInsert[attribute] = reservation[attribute];
        }
        //user._id = uuid.v4();
        //userArray.push(user);
        //return userArray;
        var deferred = q.defer();
        if(!toInsert._id) toInsert._id = new Date().getTime();
        var formatted = new reservationModel(toInsert);
        reservationModel.create(formatted, function(err, retVal){
            reservationModel.find(function(err, retVal){
                console.log("adding reservation..." + reservation._id);
                deferred.resolve(retVal);
            });
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        reservationModel.find(function(err, retVal){
            deferred.resolve(retVal);
        });
        return deferred.promise;
        //return userArray;
    }

    function FindById(id){
        var deferred = q.defer();

        reservationModel.findById(id, function(err, retVal){
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

    function FindByStudentId(sid){
        var deferred = q.defer();
        var condition = {studentId : sid};
        reservationModel.find(condition, function(err, retVal){
            console.log("model returns with reservation data " + retVal + " for student " + sid);
            if(err) deferred.reject(err);
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }

    function FindByTutorId(tid){
        var deferred = q.defer();
        var condition = {tutorId : tid};
        reservationModel.find(condition, function(err, retVal){
            if(err) deferred.reject(err);
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }

    function Update(id, reservation){
        //delete user._id;
        var condition = {_id : id};
        var deferred = q.defer();
        reservationModel.findOne(condition, function(err, retVal){
            if(err) deferred.reject(err);
            for(var attribute in reservation){
                retVal[attribute] = reservation[attribute];
            }
            retVal.save(function(err, retUser){
                reservationModel.find(function(err, reservationArray){
                    deferred.resolve(reservationArray);
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

        reservationModel.remove(condition, function(err, retVal){
            if(err) {
                deferred.reject(err);
            }
            else {
                reservationModel.find(function(err, userArray) {
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
};
