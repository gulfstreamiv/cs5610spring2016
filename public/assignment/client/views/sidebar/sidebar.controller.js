(function(){
    "use strict";
    angular.module("FormBuilderApp").controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $scope, $location){

        $scope.currentUser = function(){
            return $rootScope.user;
        };

        $scope.currentAdmin = function(){
            if(!$rootScope.user || !$rootScope.user.roles) return false;
            return $rootScope.user.roles.indexOf("admin") != -1;
        };
    }


})();