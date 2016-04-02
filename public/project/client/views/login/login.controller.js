(function() {
    "use strict";
    angular.module("TutorApp").controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService){
        $scope.login = function(){
            console.log("called login function!");
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password).then(function(retVal){
                $rootScope.user = retVal.data;
                console.log($rootScope.user);
                if($rootScope.user.roles.indexOf("student")!=-1) $location.path('studenthome');
                else $location.path('tutorhome');
            });
        }
    }
})();