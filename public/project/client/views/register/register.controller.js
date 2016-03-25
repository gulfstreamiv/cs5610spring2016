(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $scope, $location){
        $scope.user = {};
        $scope.user.field = "N/A";
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

        $scope.register = function() {
            var newUser = {
                username : $scope.user.username,
                password : $scope.user.password,
                email : $scope.user.email,
                roles : [$scope.user.type],
                type : $scope.user.type,
                field : $scope.user.field,
                location : $scope.user.location,
                price : $scope.price
            };

            UserService.createUser(newUser, function (retVal){
                $rootScope.user = retVal;
                console.log(newUser);
                $location.path('profile');
            });
        }
    }
})();