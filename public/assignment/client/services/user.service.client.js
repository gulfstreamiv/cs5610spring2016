(function () {
    "use strict";
    angular.module("FormBuilderApp").factory("UserService", UserService);

        function  UserService ($http, $q) {

            var serviceType = {
                findUserByUsername : findUserByUsername,
                findUserByCredentials: findUserByCredentials,
                findAllUsers: findAll,
                createUser: create,
                deleteUserById: deleteById,
                updateUser: updateUser
            };

            return serviceType;

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
