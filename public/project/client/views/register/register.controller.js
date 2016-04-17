(function() {
    "use strict";
    angular.module("TutorApp").controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $scope, $location){
        $scope.user = {};
        $scope.user.field = "N/A";
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

        //$scope.register = function() {
        //    var newUser = {
        //        _id : new Date().getTime(),
        //        username : $scope.user.username,
        //        password : $scope.user.password,
        //        email : $scope.user.email,
        //        roles : [$scope.user.type],
        //        type : $scope.user.type,
        //        field : $scope.user.field,
        //        location : $scope.user.location,
        //        price : $scope.price
        //    };
        //
        //    UserService.createUser(newUser).then(function (retVal){
        //        UserService.findById(newUser._id).then(function(retVal){
        //            $rootScope.user = retVal.data;
        //        });
        //        console.log(retVal.data);
        //        $location.path('profile');
        //    });
        //}

        $scope.register = function() {
            if($scope.user.password != $scope.user.verifyPassword || !$scope.user.password || !$scope.user.verifyPassword)
            {
                $scope.error = "Your passwords don't match";
            }
            else {
                var newUser = {
                    _id : new Date().getTime(),
                    username : $scope.user.username,
                    password : $scope.user.password,
                    email : $scope.user.email,
                    roles : [$scope.user.type],
                    type : $scope.user.type,
                    field : $scope.user.field,
                    location : $scope.user.location,
                    price : $scope.price
                };

                console.log("new user is : " + newUser);
                UserService
                    .register(newUser)
                    .then(
                        function(response) {
                            var users = response.data;
                            if(users != null) {
                                for (var i = 0; i < response.data.length; i++) {
                                    if (response.data[i].username === $scope.user.username) {
                                        $rootScope.user = response.data[i];
                                        UserService.login(newUser).then(function(retVal){
                                            $location.url("/profile");
                                        })
                                    }
                                }
                            }
                        },
                        function(err) {
                            $scope.error = err;
                        }
                    );
            }
        }
    }
})();