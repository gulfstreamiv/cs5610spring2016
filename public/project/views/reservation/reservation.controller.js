(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("ReservationController", ReservationController);

    function ReservationController($rootScope, $scope, $location){
        $scope.user = $rootScope.user;
        $scope.reservation = {};
        $scope.reservation.field = "N/A";
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

        $scope.durations = [
            "45 minutes",
            "90 minutes",
            "120 minutes"
        ];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        $scope.times = [
            "9:00 " + tomorrow.toString().slice(0,10),
            "10:00 " + tomorrow.toString().slice(0,10),
            "11:00 " + tomorrow.toString().slice(0,10),
            "12:00 " + tomorrow.toString().slice(0,10),
            "13:00 " + tomorrow.toString().slice(0,10),
            "14:00 " + tomorrow.toString().slice(0,10),
            "15:00 " + tomorrow.toString().slice(0,10),
            "16:00 " + tomorrow.toString().slice(0,10)
        ];

        $scope.create = function() {
            var newUser = {
                username : $scope.user.username,
                password : $scope.user.password,
                email : $scope.user.email,
                type : $scope.user.type,
                field : $scope.user.field,
                location : $scope.user.location
            };


        };

        $scope.getUserId = function(){
            return $rootScope.user._id;
        };

        $scope.fetchInt = function(str){
            if(str)
                return str.replace(/(^\d+)(.+$)/i,'$1');
        }

    }
})();