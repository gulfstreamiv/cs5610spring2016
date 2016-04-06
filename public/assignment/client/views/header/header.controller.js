(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location, UserService){

        $scope.currentUser = function(){
            return $rootScope.user;
        };

        $scope.currentAdmin = function(){
            if(!$rootScope.user || !$rootScope.user.roles) return false;
            return $rootScope.user.roles.indexOf("admin") != -1;
        };

        $scope.logout = function(){
            //$rootScope.user = null;
            //$rootScope.admin = null;
            //$location.path('home');
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.user = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        };

        $scope.getUserName = function(){
            if($rootScope.user) return $rootScope.user.username;
            else return "Username";
        }
    }
})();
