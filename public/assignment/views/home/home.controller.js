(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("HomeController", HomeController);

    function HomeController($rootScope, $scope, $location){
        $scope.$location = $location;

        $scope.ifLoggedIn = function(){
            return $rootScope.user;
        };

        $scope.getFirstName = function(){
            if($rootScope.user)
                return $rootScope.user.firstName;
            return null;
        }
    }
})();