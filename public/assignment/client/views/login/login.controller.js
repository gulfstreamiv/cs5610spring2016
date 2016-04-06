(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService){

        //$scope.login = function(){
        //    UserService.findUserByCredentials($scope.username, $scope.password).then(function(retVal){
        //        $rootScope.user = retVal.data;
        //        console.log(retVal.data);
        //        $location.path('profile')
        //    });
        //}
        $scope.login = function(){
            if($scope.username && $scope.password) {
                var user = {username:$scope.username, password:$scope.password};
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                        },
                        function (err) {
                            $scope.error = err;
                        }
                    );
            }
        }
    }
})();