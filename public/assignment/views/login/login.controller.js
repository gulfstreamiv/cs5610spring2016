(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService){
        $scope.login = function(){
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(retVal){
                $rootScope.user = retVal;
                $location.path('profile');
            });
        }
    }
})();