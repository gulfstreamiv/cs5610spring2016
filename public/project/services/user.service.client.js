(function () {
    "use strict";
    angular.module("FormBuilderApp").factory("UserService", UserService);

        function  UserService () {

            var userArray = [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		},
                {"_id":789, "firstName":"Bolun", "lastName":"Hu", "username":"bolun", "password":"bolun", "roles":["student"], "email":"bolun@bolun.com",
                "type":"Student", "field":"N/A", "location": "UW"},
                {"_id":890, "firstName":"Aaron", "lastName":"Gordon", "username":"aaron", "password":"aaron", "roles":["tutor"],
                    "type":"Tutor", "field":"Computer Science", "location": "SLU", "price":17.00}
            ];

            var serviceType = {
                findUserByUsernameAndPassword: findByNamePassword,
                findByLocationField : findByLocationField,
                findAllUsers: findAll,
                findById : findById,
                createUser: create,
                deleteUserById: deleteById,
                updateUser: updateUser
            };

            return serviceType;

            function findByNamePassword(username, password, callback) {
                for (var i = 0; i < userArray.length; i++) {
                    if (userArray[i].username == username && userArray[i].password == password)
                        callback(userArray[i]);
                }
            }

            function findById(uid, callback){
                for(var i = 0; i<userArray.length; i++){
                    if(userArray[i]._id == uid){
                        callback(userArray[i]);
                    }
                }
            }

            function findByLocationField(location, field, callback){
                var temp = [];
                for(var i = 0; i<userArray.length; i++){
                    if(userArray[i].type == "Tutor" && userArray[i].field == field && userArray[i].location == location)
                        temp.push(userArray[i]);
                }
                callback(temp);
            }

            function findAll(callback) {
                callback(userArray);
            }

            function create(user, callback) {
                user._id = new Date().getTime();
                userArray.push(user);
                callback(user);
            }

            function deleteById(userId, callback) {
                for (var i = 0; i < userArray.length; i++) {
                    if (userArray[i]._id == userId) {
                        userArray.splice(i, 1);
                    }
                }
                callback(userArray);
            }

            function updateUser(userId, user, callback) {
                for (var i = 0; i < userArray.length; i++) {
                    if (userArray[i]._id == userId) {
                        userArray[i].firstName = user.firstName;
                        userArray[i].lastName = user.lastName;
                        userArray[i].username = user.username;
                        userArray[i].password = user.password;
                        callback(userArray[i]);
                    }
                }
            }

            function getPrice(uid){
                for(var i = 0; i<userArray.length; i++){
                    if(userArray[i]._id == uid){

                    }
                }
            }
        }

})();