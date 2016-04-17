(function(){
    "use strict";
    angular
        .module("TutorApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location, UserService){

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

        $scope.logout = function(){
            UserService.logout().then(function(retVal){
                $rootScope.user = null;
                $rootScope.admin = null;
                $location.path('home');
            });
        };

        $scope.homePage = function(){
            if(!$rootScope.user) $location.path('home');
            else if($rootScope.user.roles.indexOf('student')!=-1) $location.path('studenthome');
            else if($rootScope.user.roles.indexOf('tutor')!=-1) $location.path('tutorhome');
            else $location.path('adminhome');
        };

        $scope.getId = function(){
            if($rootScope.user) return $rootScope.user._id;
        }
    }
})();