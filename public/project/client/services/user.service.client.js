(function () {
    "use strict";
    angular.module("TutorApp").factory("UserService", UserService);

        function  UserService ($http, $q) {

            //var userArray = [
            //    {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
            //        "username":"alice",  "password":"alice",   "roles": ["tutor"],
            //        "type":"tutor", "field":"Computer Science", "location": "SLU", "price":17.00    },
            //    {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
            //        "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            //    {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
            //        "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            //    {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
            //        "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            //    {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
            //        "username":"ed",     "password":"ed",      "roles": ["student"]		},
            //    {"_id":789, "firstName":"Bolun", "lastName":"Hu", "username":"bolun", "password":"bolun", "roles":["student"], "email":"bolun@bolun.com",
            //    "type":"student", "field":"N/A", "location": "UW"},
            //    {"_id":890, "firstName":"Aaron", "lastName":"Gordon", "username":"aaron", "password":"aaron", "roles":["tutor"],
            //        "type":"tutor", "field":"Computer Science", "location": "SLU", "price":17.00}
            //];

            //var feedbackArray = [
            //    {"_id": 666, "user_id": 789, "feedback": "very good experience!", "rating":3, "date":"2015-10-21T13:28:06.419Z"}
            //];

            var serviceType = {
                login : login,
                logout : logout,
                register : register,

                findUserByCredentials: findByNamePassword,
                findByLocationField : findByLocationField,
                findAllUsers: findAll,
                findById : findById,
                createUser: create,
                deleteUserById: deleteById,
                updateUser: updateUser,
                addFeedback : addFeedback,
                getFeedback : getFeedback,
                editFeedback : editFeedback,
                deleteFeedback : deleteFeedback,

                //admin functionality
                getAllUsers : getAllUsers,
                getOneUser : getOneUser,
                insertUser : insertUser,
                editUser : editUser,
                sudoDelete : sudoDelete
            };

            return serviceType;


            function register(user) {
                return $http.post("/api/project/register", user);
            }

            function login(user) {
                return $http.post("/api/project/login", user);
            }

            function logout() {
                return $http.post("/api/project/logout");
            }


            function getAllUsers(){
                var deferred = $q.defer();
                $http.get("/api/project/admin/user").then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function getOneUser(userId) {
                var deferred = $q.defer();
                $http.get('/api/project/admin/user/'+userId).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function insertUser(user) {
                var deferred = $q.defer();
                $http.post('/api/project/admin/user', user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function editUser(userId, user) {
                var deferred = $q.defer();
                $http.put('/api/project/admin/user/'+userId, user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function sudoDelete(userId){
                var deferred = $q.defer();
                $http.delete('/api/project/admin/user/'+userId).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function findByNamePassword(username, password) {
                //for (var i = 0; i < userArray.length; i++) {
                //    if (userArray[i].username == username && userArray[i].password == password)
                //        callback(userArray[i]);
                //}
                console.log("findbyNamePassword called!");
                var deferred = $q.defer();
                $http.get('/api/project/user?username='+username+'&password='+password).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function findById(uid){
                //for(var i = 0; i<userArray.length; i++){
                //    if(userArray[i]._id == uid){
                //        callback(userArray[i]);
                //    }
                //}
                var deferred = $q.defer();
                $http.get('/api/project/user/'+uid).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function findByLocationField(location, field){
                console.log("finding tutors...");
                //var temp = [];
                //for(var i = 0; i<userArray.length; i++){
                //    if(userArray[i].type == "tutor" && userArray[i].field == field && userArray[i].location == location)
                //        temp.push(userArray[i]);
                //}
                //callback(temp);
                var deferred = $q.defer();
                $http.get('/api/project/tutor/'+field+'/'+location).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function findAll() {
                //callback(userArray);
                var deferred = $q.defer();
                $http.get('/api/project/user').then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function create(user) {
                //userArray.push(user);
                //callback(user);
                var deferred = $q.defer();
                $http.post('/api/project/user', user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function deleteById(userId) {
                //for (var i = 0; i < userArray.length; i++) {
                //    if (userArray[i]._id == userId) {
                //        userArray.splice(i, 1);
                //    }
                //}
                //callback(userArray);
                var deferred = $q.defer();
                $http.delete('/api/project/user/'+userId).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function updateUser(userId, user) {
                //for (var i = 0; i < userArray.length; i++) {
                //    if (userArray[i]._id == userId) {
                //        for(var attr in user){
                //            userArray[i][attr] = user[attr];
                //        }
                //        callback(userArray[i]);
                //    }
                //}
                var deferred = $q.defer();
                $http.put('/api/project/user/'+userId, user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            //function getPrice(uid){
            //    for(var i = 0; i<userArray.length; i++){
            //        if(userArray[i]._id == uid){
            //
            //        }
            //    }
            //}

            function addFeedback(feedback){
                //feedback.date = new Date();
                //feedbackArray.push(feedback);
                //callback(feedback);
                var deferred = $q.defer();
                $http.post('/api/project/feedback', feedback).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function getFeedback(){
                var deferred = $q.defer();
                $http.get('/api/project/feedback').then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function editFeedback(feedbackId, feedback) {
                var deferred = $q.defer();
                $http.put('/api/project/admin/feedback/'+feedbackId, feedback).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function deleteFeedback(fid){
                var deferred = $q.defer();
                $http.delete('/api/project/admin/feedback/'+fid).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }
        }

})();