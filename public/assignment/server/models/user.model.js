"use strict";

var userArray = require("user.mock.json");
var uuid = require("node-uuid");

module.exports = function(app) {

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
        user._id = uuid.v4();
        userArray.push(user);
        return userArray;
    }

    function FindAll(){
        return userArray;
    }

    function FindById(id){
        for(var i = 0; i<userArray.length; i++){
            if(userArray[i]._id == id){
                return userArray[i];
            }
        }
        return null;
    }

    function Update(id, user){
        for(var i = 0; i<userArray.length; i++){
            if(userArray[i]._id == id){
                userArray[i].firstName = user.firstName;
                userArray[i].firstName = user.lastName;
                userArray[i].firstName = user.username;
                userArray[i].firstName = user.password;

            }
        }
    }

    function Delete(id){
        for(var i = 0; i<userArray.length; i++) {
            if (userArray[i]._id == id) {
                userArray.splice(i, 1);
            }
        }
    }

    function findUserByUsername(username){
        for(var i = 0; i<userArray.length; i++) {
            if (userArray[i].username == username) {
                return userArray[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password){
        for(var i = 0; i<userArray.length; i++) {
            if (userArray[i].username == username && userArray[i].password == password) {
                return userArray[i];
            }
        }
        return null;
    }
};
