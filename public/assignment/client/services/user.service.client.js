(function () {
    "use strict";
    angular.module("FormBuilderApp").factory("UserService", UserService);

        function  UserService ($http, $q) {

            var serviceType = {
                login : login,
                logout : logout,
                register : register,
                findUserByUsername : findUserByUsername,
                findUserByCredentials: findUserByCredentials,
                findAllUsers: findAll,
                createUser: create,
                deleteUserById: deleteById,
                updateUser: updateUser,
                //admin functionality
                getAllUsers : getAllUsers,
                getOneUser : getOneUser,
                insertUser : insertUser,
                editUser : editUser,
                sudoDelete : sudoDelete
            };

            return serviceType;

            function register(user) {
                return $http.post("/api/assignment/register", user);
            }

            function login(user) {
                return $http.post("/api/assignment/login", user);
            }

            function logout() {
                return $http.post("/api/assignment/logout");
            }

            function getAllUsers(){
                var deferred = $q.defer();
                $http.get("/api/assignment/admin/user").then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function getOneUser(userId) {
                var deferred = $q.defer();
                $http.get('/api/assignment/admin/user/'+userId).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function insertUser(user) {
                var deferred = $q.defer();
                $http.post('/api/assignment/admin/user', user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function editUser(userId, user) {
                var deferred = $q.defer();
                $http.put('/api/assignment/admin/user/'+userId, user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function sudoDelete(userId){
                var deferred = $q.defer();
                $http.delete('/api/assignment/admin/user/'+userId).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function findUserByUsername(username){
                var deferred = $q.defer();
                $http.get('/api/assignment/user?username='+username).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function findUserByCredentials(username, password) {
                var deferred = $q.defer();
                $http.get('/api/assignment/user?username='+username+'&password='+password).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function findAll() {
                var deferred = $q.defer();
                $http.get('/api/assignment/user').then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function create(user) {
                var deferred = $q.defer();
                $http.post('/api/assignment/user', user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function deleteById(userId) {
                var deferred = $q.defer();
                $http.delete('/api/assignment/user/'+userId).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }

            function updateUser(userId, user) {
                var deferred = $q.defer();
                $http.put('/api/assignment/user/'+userId, user).then(function(retVal){
                    deferred.resolve(retVal);
                });
                return deferred.promise;
            }
        }

})();
