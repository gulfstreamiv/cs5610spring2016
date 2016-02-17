(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("LoginController", implementation);

    function implementation($rootScope, $scope, $location, UserService){
        $scope.$location = $location;
        function login(){
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(retVal){
                $rootscope.user = retVal;
                $location.path('profile');
            })
        }
    }
})();