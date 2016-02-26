(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("ConfirmationController", ConfirmationController);

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
        UserService.findById(tid, function(retVal){
            $scope.tutorFirstName = retVal.firstName;
            $scope.tutorLastName = retVal.lastName;
        });

        UserService.findById(tid, function(retVal){
            $scope.price = Math.round(retVal.price * duration / 60);
        });

        $scope.confirm = function(){
            ReservationService.createReservation(sid, tid, field, time, location, duration, function(retVal){
                console.log(retVal);
            });
            $location.path('studenthome');
        }
    }
})();