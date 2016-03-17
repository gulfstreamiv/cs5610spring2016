(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $scope, $location){
        $scope.register = function() {
            var username = $scope.user.username;
            var password = $scope.user.password;
            var email = $scope.user.email;
            var newUser = { "username":username, "firstName":"", "lastName":"",
                "password":password, "emails": [email], "phones":["123123123"]};
            console.log("new user is : " + newUser);
            UserService.createUser(newUser).then(function (retVal){
                //retVal is a collection of users!
                console.log(retVal.data);
                for(var i = 0 ; i<retVal.data.length; i++){
                    if(retVal.data[i].username === $scope.user.username) {
                        $rootScope.user = retVal.data[i];
                    }
                }
                $location.path('profile');
            });
        }
    }
})();
