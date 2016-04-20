(function() {
    "use strict";
    angular.module("TutorApp").controller("UserMgmtController", UserMgmtController);

    function UserMgmtController($rootScope, $scope, $location, UserService){
        $scope.sorted = false;
        $scope.sortUsernameAscending = false;
        $scope.sortUsernameDescending = false;
        $scope.sortFirstNameAscending = false;
        $scope.sortFirstNameDescending = false;
        $scope.sortLastNameAscending = false;
        $scope.sortLastNameDescending = false;

        function compareUsername(a,b) {
            if (a.username < b.username)
                return -1;
            else if (a.username > b.username)
                return 1;
            else
                return 0;
        }

        function compareFirstName(a,b) {
            if (a.firstName < b.firstName)
                return -1;
            else if (a.firstName > b.firstName)
                return 1;
            else
                return 0;
        }

        function compareLastName(a, b){
            if (a.lastName < b.lastName)
                return -1;
            else if (a.lastName > b.lastName)
                return 1;
            else
                return 0;
        }

        $scope.showSortUserNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortUsernameAscending;
        };

        $scope.showSortUserNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortUsernameDescending;
        };

        $scope.showSortFirstNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortFirstNameAscending;
        };

        $scope.showSortFirstNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortFirstNameDescending;
        };

        $scope.showSortLastNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortLastNameAscending;
        };

        $scope.showSortLastNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortLastNameDescending;
        };

        //$scope.refreshByUsername = function(){
        //    UserService.getAllUsers().then(function(retVal){
        //        sortByUsername(retVal.data);
        //        $scope.users.sort(compareUsername).reverse();
        //        console.log($scope.users);
        //    });
        //};

        $scope.sortByUsername = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortUsernameAscending = true;
                $scope.users.sort(compareUsername);
            }
            else if($scope.sortUsernameAscending == false && $scope.sortUsernameDescending == false){
                $scope.sortUsernameAscending = true;
                $scope.users.sort(compareUsername);
            }
            else if($scope.sortUsernameAscending == true && $scope.sortUsernameDescending == false){
                $scope.sortUsernameDescending = true;
                $scope.sortUsernameAscending = false;
                $scope.users.sort(compareUsername).reverse();
            }
            else if($scope.sortUsernameAscending == false && $scope.sortUsernameDescending == true){
                $scope.sortUsernameDescending = false;
                $scope.sortUsernameAscending = true;
                $scope.users.sort(compareUsername);
            }
            $scope.sorted = true;
            $scope.sortFirstNameAscending = false;
            $scope.sortFirstNameDescending = false;
            $scope.sortLastNameAscending = false;
            $scope.sortLastNameDescending = false;
        };

        $scope.sortByFirstName = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortFirstNameAscending = true;
                $scope.users.sort(compareFirstName);
            }
            else if($scope.sortFirstNameAscending == false && $scope.sortFirstNameDescending == false){
                $scope.sortFirstNameAscending = true;
                $scope.users.sort(compareFirstName);
            }
            else if($scope.sortFirstNameAscending == true && $scope.sortFirstNameDescending == false){
                $scope.sortFirstNameDescending = true;
                $scope.sortFirstNameAscending = false;
                $scope.users.sort(compareFirstName).reverse();
            }
            else if($scope.sortFirstNameAscending == false && $scope.sortFirstNameDescending == true){
                $scope.sortFirstNameDescending = false;
                $scope.sortFirstNameAscending = true;
                $scope.users.sort(compareFirstName);
            }
            $scope.sorted = true;
            $scope.sortUsernameAscending = false;
            $scope.sortUsernameDescending = false;
            $scope.sortLastNameAscending = false;
            $scope.sortLastNameDescending = false;
        };

        $scope.sortByLastName = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortLastNameAscending = true;
                $scope.users.sort(compareLastName);
            }
            else if($scope.sortLastNameAscending == false && $scope.sortLastNameDescending == false){
                $scope.sortLastNameAscending = true;
                $scope.users.sort(compareLastName);
            }
            else if($scope.sortLastNameAscending == true && $scope.sortLastNameDescending == false){
                $scope.sortLastNameDescending = true;
                $scope.sortLastNameAscending = false;
                $scope.users.sort(compareLastName).reverse();
            }
            else if($scope.sortLastNameAscending == false && $scope.sortLastNameDescending == true){
                $scope.sortLastNameDescending = false;
                $scope.sortLastNameAscending = true;
                $scope.users.sort(compareLastName);
            }
            $scope.sorted = true;
            $scope.sortUsernameAscending = false;
            $scope.sortUsernameDescending = false;
            $scope.sortFirstNameAscending = false;
            $scope.sortFirstNameDescending = false;
        };

        if($rootScope.user) getAllUsers();

        $scope.selectedUser = {};
        $scope.addUser = function(){
            var newUser = {};
            newUser.location = "SLU";
            if($scope.selectedUser.roles) {
                newUser.type = $scope.selectedUser.roles;
            }
            else {
                newUser.type = "student";
                $scope.selectedUser.roles = ["student"];
            }
            //newUser.roles = selectedUser.roles.split(",");
            //delete selectedUser.roles;
            for(var attr in $scope.selectedUser){
                newUser[attr] = $scope.selectedUser[attr];
            }
            UserService.insertUser(newUser).then(function(retVal){
                getAllUsers();
            });
            $scope.selectedUser = {};
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
            $scope.selectedUser = {};
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
                console.log(retVal.data);
                $scope.users = retVal.data;
            });
            console.log($scope.users);
        }
    }
})();