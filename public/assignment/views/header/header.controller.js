(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location){

        this.currentUser = function(){
            return $rootScope.user;
        };

        this.currentAdmin = function(){
            if(!$rootScope.user) return false;
            return $rootScope.user.roles.indexOf("admin") != -1;
        };

        this.logout = function(){
            $rootScope.user = null;
            $rootScope.admin = null;
            $location.path('home');
        }
    }
})();