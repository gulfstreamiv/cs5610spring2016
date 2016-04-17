(function(){
    "use strict";
    angular.module("TutorApp").controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.locations =
            [
                "UW",
                "SLU",
                "Northgate",
                "Bellevue",
                "NEU-Seattle"
            ];

        $scope.fields =
            [
                "Mathematics",
                "Physics",
                "Computer Science"
            ];

        //pre-fill the blanks with current user info
        $scope.user = $rootScope.user;

        $scope.update = function() {
            console.log("updating user...");
            UserService.updateUser($scope.user._id, $scope.user).then(function(updatedUser){
                //Do nothing
                console.log(JSON.stringify($scope.user));
                if(!$rootScope.user) $location.path('home');
                else if($rootScope.user.roles.indexOf('student')!=-1) $location.path('studenthome');
                else if($rootScope.user.roles.indexOf('tutor')!=-1) $location.path('tutorhome');
                else $location.path('adminhome');
            });
        };

        $scope.getType = function(type){
            if(type.indexOf("student")!=-1) return "STUDENT";
            else if(type.indexOf("tutor")!=-1) return "TUTOR";
            else return "ADMIN";
        }

    }

})();