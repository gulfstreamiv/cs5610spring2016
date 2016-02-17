(function () {
    "use strict";
    angular.module("FormBuilderApp").factory("UserService", UserService);

        function  UserService () {

            var userArray = [
                {"_id": 123, "firstName": "Alice", "lastName": "Wonderland", "username": "alice", "password": "alice"},
                {"_id": 234, "firstName": "Bob", "lastName": "Hope", "username": "bob", "password": "bob"},
                {"_id": 345, "firstName": "Charlie", "lastName": "Brown", "username": "charlie", "password": "charlie"},
                {"_id": 456, "firstName": "Dan", "lastName": "Craig", "username": "dan", "password": "dan"},
                {"_id": 567, "firstName": "Edward", "lastName": "Norton", "username": "ed", "password": "ed"}
            ];

            var adminArray = [];

            var serviceType = {
                findUserByUsernameAndPassword: findByNamePassword,
                findAllUsers: findAll,
                createUser: create,
                deleteUserById: deleteById,
                updateUser: updateUser,
            };

            return serviceType;

            function findByNamePassword(username, password, callback) {
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