(function(){
    "use strict";
    angular.module("TutorApp").controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.locations =
            [
                "UW",
                "SLU",
                "Northgate",
                "Bellevue"
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
                $location.path("home")
            });
        };

        $scope.getType = function(type){
            if(type.indexOf("student")!=-1) return "STUDENT";
            else return "TUTOR";
        }

    }

})();