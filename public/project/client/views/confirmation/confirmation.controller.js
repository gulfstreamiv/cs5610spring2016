(function() {
    "use strict";
    angular.module("TutorApp").controller("ConfirmationController", ConfirmationController);

    function ConfirmationController($scope, $location, $routeParams, UserService, ReservationService){
        var sid = $routeParams.sid;
        var tid = $routeParams.tid;
        var field = $routeParams.field;
        var time = $routeParams.time;
        var location = $routeParams.location;
        var duration = $routeParams.duration;

        $scope.time = time;
        $scope.location = location;
        $scope.field = field;
        UserService.findById(tid).then(function(retVal){
            $scope.tutorFirstName = retVal.data.firstName;
            $scope.tutorLastName = retVal.data.lastName;
        });

        UserService.findById(tid).then(function(retVal){
            $scope.price = Math.round(retVal.data.price * duration / 60);
        });

        $scope.confirm = function(){
            ReservationService.createReservation(sid, tid, field, time, location, duration, $scope.price).then(function(retVal){
                console.log(retVal.data);
            });
            $location.path('studenthome');
        }
    }
})();