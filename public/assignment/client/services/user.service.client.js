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
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ];

            var serviceType = {
                findUserByCredentials: findUserByCredentials,
                findAllUsers: findAll,
                createUser: create,
                deleteUserById: deleteById,
                updateUser: updateUser
            };

            return serviceType;

            function findUserByCredentials(username, password, callback) {
                for (var i = 0; i < userArray.length; i++) {
                    if (userArray[i].username == username && userArray[i].password == password)
                        callback(userArray[i]);
                }
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
        }

})();