(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location){

        $scope.currentUser = function(){
            return $rootScope.user;
        };

        $scope.currentAdmin = function(){
            if(!$rootScope.user) return false;
            return $rootScope.user.roles.indexOf("admin") != -1;
        };

        $scope.currentStudent = function(){
            if(!$rootScope.user) return false;
            return $rootScope.user.roles.indexOf("Student") != -1;
        };

        $scope.currentTutor = function(){
            if(!$rootScope.user) return false;
            return $rootScope.user.roles.indexOf("Tutor") != -1;
        };

        $scope.logout = function(){
            $rootScope.user = null;
            $rootScope.admin = null;
            $location.path('home');
        }
    }
})();