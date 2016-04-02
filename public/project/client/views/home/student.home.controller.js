(function() {
    "use strict";
    angular.module("TutorApp").controller("StudentHomeController", StudentHomeController);

    function StudentHomeController($rootScope, $scope, $location){
        $scope.user = $rootScope.user;

        $scope.ifLoggedIn = function(){
            return $rootScope.user;
        };

        $scope.getUsername = function(){
            if($rootScope.user)
                return $rootScope.user.username;
            return null;
        }
    }
})();