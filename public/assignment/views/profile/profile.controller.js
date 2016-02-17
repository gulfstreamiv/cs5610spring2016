(function(){
    "use strict";
    angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {
        //update url
        $scope.$location = $location;
        $scope.update = update;

        //pre-fill the blanks with current user info
        $scope.user = $rootScope.user;

        function update() {
            console.log("you clicked update button!!!");

            UserService.updateUser($scope.user._id, $scope.user, function(updatedUser){
                //Do nothing
                console.log(JSON.stringify($scope.user));
                $location.path("home")
            });
        }

    }

})();