(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, $location, UserService){
        if($rootScope.user) getAllUsers();
        $scope.selectedUser = {};
        $scope.addUser = function(){
            var newUser = {};
            //newUser.roles = selectedUser.roles.split(",");
            //delete selectedUser.roles;
            for(var attr in $scope.selectedUser){
                newUser[attr] = $scope.selectedUser[attr];
            }
            UserService.insertUser(newUser).then(function(retVal){
                getAllUsers();
            });
        };

        $scope.updateUser = function(){
            var newUser = {};
            var userId = $scope.selectedUser._id;
            for(var attr in $scope.selectedUser){
                newUser[attr] = $scope.selectedUser[attr];
            }

            UserService.editUser(userId, newUser).then(function(retVal){
                getAllUsers();
            });
        };

        $scope.editUser = function(user){
            for(var attr in user){
                $scope.selectedUser[attr] = user[attr];
            }
        };

        $scope.deleteUser = function(user){
            var userId = user._id;
            UserService.sudoDelete(userId).then(function(retVal){
                getAllUsers();
            });
        };

        function getAllUsers() {
            UserService.getAllUsers().then(function(retVal){
                $scope.users = retVal.data;
            });
        }
    }
})();