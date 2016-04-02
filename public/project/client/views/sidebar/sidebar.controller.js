(function(){
    "use strict";
    angular.module("TutorApp").controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $scope, $location){
        $scope.currentUser = function(){
            return $rootScope.user;
        };

        $scope.currentAdmin = function(){
            if(!$rootScope.user) return false;
            return $rootScope.user.roles.indexOf("admin") != -1;
        };

        $scope.currentStudent = function(){
            if(!$rootScope.user) return false;
            return $rootScope.user.roles.indexOf("student") != -1;
        };

        $scope.currentTutor = function(){
            if(!$rootScope.user) return false;
            return $rootScope.user.roles.indexOf("tutor") != -1;
        };

        $scope.homePage = function(){
            if(!$rootScope.user) $location.path('home');
            else if($rootScope.user.roles.indexOf('student')!=-1) $location.path('studenthome');
            else $location.path('tutorhome');
        }
    }


})();