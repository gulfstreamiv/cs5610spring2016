(function() {
    "use strict";
    angular.module("TutorApp").controller("StudentHistoryController", StudentHistoryController);

    function StudentHistoryController($rootScope, $scope, $routeParams, ReservationService, UserService){
        $scope.uid = $routeParams.uid;
        $scope.field = $routeParams.field;
        $scope.location = $routeParams.location;
        $scope.duration = $routeParams.duration;
        $scope.time = $routeParams.time;

        $scope.reservation = {};

        var c = 0;

        $scope.counter = function(){
            console.log("called counter! " + c);
            //c = c+1;
            return c;
        };

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

        $scope.reservationCache = {};

        ReservationService.findAllReservationsForStudent($scope.uid).then(function (retVal) {
            //console.log("List of reservations for student Bolun: " + retVal.data[0].tutorId + " length is :" + retVal.data.length);
            $scope.reservationCache[$scope.uid] = retVal.data;
            //console.log("uid: " + $scope.uid + "has been memorized to reservation");
        });

        //$scope.getOrderList = function(uid){
        //    if($scope.reservationCache[uid]) {
        //        console.log("using reservationCache for student " + uid);
        //        return reservationCache[uid];
        //    }
        //    ReservationService.findAllReservationsForStudent(uid).then(function (retVal) {
        //        console.log("List of reservations for student Bolun: " + retVal.data[0].tutorId + " length is :" + retVal.data.length);
        //        reservationCache[uid] = retVal.data;
        //        console.log("uid: " + uid + "has been memorized to reservation");
        //    });
        //    //console.log("we got here");
        //    return reservationCache[uid]
        //};

        //$scope.deferredGetOrderList = function(uid){
        //    while(!reservationCache[uid]) {
        //
        //    }
        //    return reservationCache[uid];
        //};


        //var nameCache;
        $scope.tutorCache = {};

        UserService.findAllUsers().then(function(retVal){
            //console.log(retVal.data.firstName + " " + retVal.data.lastName);
            //tutorCache[tid] = retVal.data.firstName + " " + retVal.data.lastName;
            //console.log("uid: " + tid + "has been memorized to tutorCache");
            console.log(retVal.data);
            for (var i = 0; i<retVal.data.length; i++){
            //    if(temp == 'tutor'){
                    $scope.tutorCache[retVal.data[i]._id] = retVal.data[i];
                    console.log("storing names " + retVal.data[i]);
            //    }
            }
        });

        $scope.getTutorName = function(tid){
            if($scope.tutorCache[tid]) {
                console.log("fetching name");
                return $scope.tutorCache[tid].firstName + " " + $scope.tutorCache[tid].lastName;
            }
        };

        //$scope.getAllTutorName = function(tid) {
        //    //if(tutorCache[tid]) {
        //    //    console.log("using tutorCache for tutor " + tid);
        //    //    return tutorCache[tid];
        //    //}
        //    //console.log("getTutorName called! with tutor id : " + tid);
        //    UserService.findAllUsers().then(function(retVal){
        //        //console.log(retVal.data.firstName + " " + retVal.data.lastName);
        //        //tutorCache[tid] = retVal.data.firstName + " " + retVal.data.lastName;
        //        //console.log("uid: " + tid + "has been memorized to tutorCache");
        //        for (var item in retVal.data){
        //            if(item.type.indexOf('tutor')!=-1){
        //                $scope.tutorCache[item._id] = item;
        //            }
        //        }
        //    });
        //    //return tutorCache[tid];
        //};

        //edit reservation options
        $scope.editReservation = function(orderId){
            $scope.newOrder = {};
            $scope.newOrder.time = fetchInt($scope.reservation.time);
            $scope.newOrder.location = $scope.reservation.location;
            $scope.newOrder.duration = fetchInt($scope.reservation.duration);

            ReservationService.findReservationById(orderId).then(function(retVal){
                console.log("updated tid is " + retVal.data.tutorId);
                //tid = retVal.data.tutorId;
                //console.log("prepare to get new price for tutor " + tid);
                UserService.findById(retVal.data.tutorId).then(function(retVal){
                    console.log("updated price/hour is " + retVal.data.price);
                    console.log("updated reservation duration is " + $scope.newOrder.duration);
                    $scope.rate = retVal.data.price;
                    $scope.newOrder.price = Math.round($scope.rate * $scope.newOrder.duration / 60);
                    console.log("new order price is : " + $scope.newOrder.price);
                    ReservationService.updateReservationById(orderId, $scope.newOrder).then(function(retVal){
                        //for(var i = 0 ; i< retVal.length; i++) console.log(retVal[i]);
                        ReservationService.findAllReservationsForStudent($routeParams.uid).then(function (retVal) {
                            $scope.reservationCache[$scope.uid] = retVal.data;
                        });
                    });
                });
            });

            //console.log("updating order: " + orderId);
            //while(!newOrder.price) {}
            //console.log("new order price is : " + $scope.newOrder.price);
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

        //function getTutorRateFromOrder(orderId){
        //    var tid;
        //    var rate;
        //    console.log("initiate getTutorRate! Orderid is " + orderId);
        //    ReservationService.findReservationById(orderId).then(function(retVal){
        //        console.log("updated tid is " + retVal.data.tutorId);
        //        tid = retVal.data.tutorId;
        //    });
        //    UserService.findById(tid).then(function(retVal){
        //        console.log("updated price is " + retVal.data.price);
        //        rate = retVal.data.price;
        //    });
        //    return rate;
        //}

        //delete reservation
        $scope.deleteOrder = function(orderId){
            ReservationService.deleteReservationById(orderId).then(function(retVal){
                $scope.reservationCache[$scope.uid] = retVal.data;
            });
        }

    }
})();