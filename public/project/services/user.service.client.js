(function () {
    "use strict";
    angular.module("FormBuilderApp").factory("UserService", UserService);

        function  UserService () {

            var userArray = [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["tutor"],
                    "type":"tutor", "field":"Computer Science", "location": "SLU", "price":17.00    },
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		},
                {"_id":789, "firstName":"Bolun", "lastName":"Hu", "username":"bolun", "password":"bolun", "roles":["student"], "email":"bolun@bolun.com",
                "type":"student", "field":"N/A", "location": "UW"},
                {"_id":890, "firstName":"Aaron", "lastName":"Gordon", "username":"aaron", "password":"aaron", "roles":["tutor"],
                    "type":"tutor", "field":"Computer Science", "location": "SLU", "price":17.00}
            ];

            var feedbackArray = [
                {"_id": 666, "user_id": 789, "feedback": "very good experience!", "rating":3, "date":"2015-10-21T13:28:06.419Z"}
            ];

            var serviceType = {
                findUserByUsernameAndPassword: findByNamePassword,
                findByLocationField : findByLocationField,
                findAllUsers: findAll,
                findById : findById,
                createUser: create,
                deleteUserById: deleteById,
                updateUser: updateUser,
                addFeedback : addFeedback
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
                console.log("finding tutors...");
                var temp = [];
                for(var i = 0; i<userArray.length; i++){
                    if(userArray[i].type == "tutor" && userArray[i].field == field && userArray[i].location == location)
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
                        for(var attr in user){
                            userArray[i][attr] = user[attr];
                        }
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

            function addFeedback(feedback, callback){
                feedback.date = new Date();
                feedbackArray.push(feedback);
                callback(feedback);
            }
        }

})();