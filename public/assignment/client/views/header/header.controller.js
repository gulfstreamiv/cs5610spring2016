(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location){

        $scope.currentUser = function(){
            return $rootScope.user;
        };

        $scope.currentAdmin = function(){
            if(!$rootScope.user || !$rootScope.user.roles) return false;
            return $rootScope.user.roles.indexOf("admin") != -1;
        };

        $scope.logout = function(){
            $rootScope.user = null;
            $rootScope.admin = null;
            $location.path('home');
        };

        $scope.getUserName = function(){
            if($rootScope.user) return $rootScope.user.username;
            else return "Username";
        }
    }
})();
