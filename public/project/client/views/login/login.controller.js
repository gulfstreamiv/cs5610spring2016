(function() {
    "use strict";
    angular.module("TutorApp").controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService, $http){
        $scope.login = function(){
            console.log("called login function!");
            var user = {username:$scope.username, password:$scope.password};

            UserService.login(user).then(function(retVal){
                //UserService.
                //$http.get("/api/project/loggedin");
                $rootScope.user = retVal.data;
                console.log($rootScope.user);
                if($rootScope.user.roles.indexOf("student")!=-1) $location.path('studenthome');
                else if($rootScope.user.roles.indexOf("tutor")!=-1) $location.path('tutorhome');
                else {
                    console.log("directing to admin homepage...");
                    $location.path('adminhome');
                }
            },
            function (err) {
                $scope.error = err;
            });
        }
    }
})();