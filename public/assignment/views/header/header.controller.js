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
            return $rootScope.admin;
        };

        this.logout = function(){
            $rootScope.user = null;
            $rootScope.admin = null;
            $location.path('home');
        }
    }
})();