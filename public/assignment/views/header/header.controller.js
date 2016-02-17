(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location){

        function currentUser(){
            return $rootScope.user;
        }

        function currentAdmin(){
            return $rootScope.admin;
        }

        function logout(){
            $rootScope.user = null;
            $rootScope.admin = null;
            $location.path('home');
        }
    };
})();