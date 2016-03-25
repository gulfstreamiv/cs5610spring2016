(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("StudentHistoryController", StudentHistoryController);

    function StudentHistoryController($rootScope, $scope, $routeParams, ReservationService, UserService){
        $scope.uid = $routeParams.uid;
        $scope.field = $routeParams.field;
        $scope.location = $routeParams.location;
        $scope.duration = $routeParams.duration;
        $scope.time = $routeParams.time;

        $scope.reservation = {};

        //for updating orders
        $scope.locations =
            [
                {label:"University of Washington, Seattle, WA", value:"UW"},
                {label:"South Lake Union, Seattle, WA", value:"SLU"},
                {label:"Northgate, Seattle, WA", value:"Northgate"},
                {label:"Bellevue, WA", value:"Northgate"},
                {label:"Northeastern University, Seattle, WA", value:"NEU-Seattle"}
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

        ReservationService.findAllReservationsForStudent($routeParams.uid, function (retVal) {
            $scope.orderList = retVal;
        });

        $scope.getTutorName = function(tid) {
            UserService.findById(tid, function(retVal){
                //console.log(retVal.firstName + " " + retVal.lastName);
                $scope.tempTutor = retVal;
            });
            return $scope.tempTutor.firstName + " " + $scope.tempTutor.lastName;
        };

        //edit reservation options
        $scope.editReservation = function(orderId){
            var newOrder = {};
            newOrder.time = fetchInt($scope.reservation.time);
            newOrder.location = $scope.reservation.location;
            newOrder.duration = fetchInt($scope.reservation.duration);
            newOrder.price = Math.round(getTutorRateFromOrder(orderId) * fetchInt($scope.reservation.duration) / 60);
            ReservationService.updateReservationById(orderId, newOrder, function(retVal){
                ReservationService.findAllReservationsForStudent($routeParams.uid, function (retVal) {
                    $scope.orderList = retVal;
                });
            });
            $scope.reservation = {};
            $(".modal-backdrop").hide();
            $('body').removeClass('modal-open');
        };

        function fetchInt(str) {
            if(str)
                return parseInt(str.replace(/(^\d+)(.+$)/i,'$1'), 10);
        }

        $scope.getDefault = function(attribute, array){
            for(var i = 0; i<array.length; i++){
                if(attribute == fetchInt(array[i])) {
                    return array[i];
                }
            }
        };

        function getTutorRateFromOrder(orderId){
            var tid;
            var rate;
            console.log("initiate getTutorRate! Orderid is " + orderId);
            ReservationService.findReservationById(orderId, function(retVal){
                console.log("updated tid is " + retVal.tutorId);
                tid = retVal.tutorId;
            });
            UserService.findById(tid, function(retVal){
                console.log("updated price is " + retVal.price);
                rate = retVal.price;
            });
            return rate;
        }

        //delete reservation
        $scope.deleteOrder = function(orderId){
            ReservationService.deleteReservationById(orderId, function(retVal){
                $scope.orderList = retVal;
            });
        }

    }
})();