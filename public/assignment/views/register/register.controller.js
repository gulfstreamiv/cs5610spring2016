(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $scope, $location){
        $scope.register = register;
        $scope.$location = $location;

        function register() {
            var newUser = {
                username : $scope.user.username,
                password : $scope.user.password,
                email : $scope.user.email
            }

            UserService.createUser(newUser, function (retVal){
                $rootScope.user = retVal;
                $location.path('profile');
            })
        }
    }
})();