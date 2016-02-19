(function(){
    "use strict";
    angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        //pre-fill the blanks with current user info
        $scope.user = $rootScope.user;

        $scope.update = function() {
            UserService.updateUser($scope.user._id, $scope.user, function(updatedUser){
                //Do nothing
                console.log(JSON.stringify($scope.user));
                $location.path("home")
            });
        }

    }

})();