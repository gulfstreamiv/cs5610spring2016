(function() {
    "use strict";
    angular.module("TutorApp").controller("HomeController", HomeController);

    function HomeController($rootScope, $scope, $location){
        $scope.ifLoggedIn = function(){
            return $rootScope.user;
        };

        $scope.getFirstName = function(){
            if($rootScope.user)
                return $rootScope.user.firstName + $rootScope.user.lastName;
            return null;
        }
    }
})();
