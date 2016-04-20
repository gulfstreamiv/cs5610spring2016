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

        $scope.paid = false;
        $scope.time = time;
        $scope.location = location;
        $scope.field = field;
        $scope.duration = duration;
        UserService.findById(tid).then(function(retVal){
            $scope.tutorFirstName = retVal.data.firstName;
            $scope.tutorLastName = retVal.data.lastName;
        });

        UserService.findById(tid).then(function(retVal){
            $scope.price = Math.round(retVal.data.price * duration / 60);
        });

        $scope.pay = function(){
            $scope.paid = true;
        };

        $scope.confirm = function(){
            if($scope.paid == false) alert("Please make your payment before proceeding!");
            else {
                ReservationService.createReservation(sid, tid, field, time, location, duration, $scope.price).then(function (retVal) {
                    console.log(retVal.data);
                });
                alert("Your reservation has been confirmed. Thank you!")
                $location.path('studenthome');
            }
        }
    }
})();