(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("LoginController", implementation);

    function implementation($rootScope, $scope, $location, UserService){
        $scope.$location = $location;
        $scope.login = login;

        function login(){
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(retVal){
                $rootScope.user = retVal;
                $location.path('profile');
            });
        }
    }
})();