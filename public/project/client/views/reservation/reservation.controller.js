(function() {
    "use strict";
    angular.module("TutorApp").controller("ReservationController", ReservationController);

    function ReservationController($rootScope, $scope, $location){
        $scope.user = $rootScope.user;
        $scope.reservation = {};
        $scope.reservation.field = "N/A";
        $scope.locations =
        [
            {label:"University of Washington, Seattle, WA", value:"UW"},
            {label:"South Lake Union, Seattle, WA", value:"SLU"},
            {label:"Northgate, Seattle, WA", value:"Northgate"},
            {label:"Bellevue, WA", value:"Northgate"},
            {label:"Northeastern University, Seattle, WA", value:"NEU-Seattle"}
        ];

        $scope.fields =
        [
            "Mathematics",
            "Physics",
            "Computer Science"
        ];

        $scope.durations = [
            "45 Minutes",
            "90 Minutes",
            "120 Minutes"
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