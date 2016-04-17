(function() {
    "use strict";
    angular.module("TutorApp").controller("ReservationMgmtController", ReservationMgmtController);

    function ReservationMgmtController($rootScope, $scope, $location, UserService, ReservationService){
        $scope.sorted = false;
        $scope.sortUsernameAscending = false;
        $scope.sortUsernameDescending = false;
        $scope.sortFirstNameAscending = false;
        $scope.sortFirstNameDescending = false;
        $scope.sortLastNameAscending = false;
        $scope.sortLastNameDescending = false;

        function compareUsername(a,b) {
            if (a.price < b.price)
                return -1;
            else if (a.price > b.price)
                return 1;
            else
                return 0;
        }

        function compareFirstName(a,b) {
            if (a.time < b.time)
                return -1;
            else if (a.time > b.time)
                return 1;
            else
                return 0;
        }

        function compareLastName(a, b){
            if (a.duration < b.duration)
                return -1;
            else if (a.duration > b.duration)
                return 1;
            else
                return 0;
        }

        $scope.showSortUserNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortUsernameAscending;
        };

        $scope.showSortUserNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortUsernameDescending;
        };

        $scope.showSortFirstNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortFirstNameAscending;
        };

        $scope.showSortFirstNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortFirstNameDescending;
        };

        $scope.showSortLastNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortLastNameAscending;
        };

        $scope.showSortLastNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortLastNameDescending;
        };

        //$scope.refreshByUsername = function(){
        //    UserService.getAllUsers().then(function(retVal){
        //        sortByUsername(retVal.data);
        //        $scope.reservations.sort(compareUsername).reverse();
        //        console.log($scope.reservations);
        //    });
        //};

        $scope.sortByUsername = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortUsernameAscending = true;
                $scope.reservations.sort(compareUsername);
            }
            else if($scope.sortUsernameAscending == false && $scope.sortUsernameDescending == false){
                $scope.sortUsernameAscending = true;
                $scope.reservations.sort(compareUsername);
            }
            else if($scope.sortUsernameAscending == true && $scope.sortUsernameDescending == false){
                $scope.sortUsernameDescending = true;
                $scope.sortUsernameAscending = false;
                $scope.reservations.sort(compareUsername).reverse();
            }
            else if($scope.sortUsernameAscending == false && $scope.sortUsernameDescending == true){
                $scope.sortUsernameDescending = false;
                $scope.sortUsernameAscending = true;
                $scope.reservations.sort(compareUsername);
            }
            $scope.sorted = true;
            $scope.sortFirstNameAscending = false;
            $scope.sortFirstNameDescending = false;
            $scope.sortLastNameAscending = false;
            $scope.sortLastNameDescending = false;
        };

        $scope.sortByFirstName = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortFirstNameAscending = true;
                $scope.reservations.sort(compareFirstName);
            }
            else if($scope.sortFirstNameAscending == false && $scope.sortFirstNameDescending == false){
                $scope.sortFirstNameAscending = true;
                $scope.reservations.sort(compareFirstName);
            }
            else if($scope.sortFirstNameAscending == true && $scope.sortFirstNameDescending == false){
                $scope.sortFirstNameDescending = true;
                $scope.sortFirstNameAscending = false;
                $scope.reservations.sort(compareFirstName).reverse();
            }
            else if($scope.sortFirstNameAscending == false && $scope.sortFirstNameDescending == true){
                $scope.sortFirstNameDescending = false;
                $scope.sortFirstNameAscending = true;
                $scope.reservations.sort(compareFirstName);
            }
            $scope.sorted = true;
            $scope.sortUsernameAscending = false;
            $scope.sortUsernameDescending = false;
            $scope.sortLastNameAscending = false;
            $scope.sortLastNameDescending = false;
        };

        $scope.sortByLastName = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortLastNameAscending = true;
                $scope.reservations.sort(compareLastName);
            }
            else if($scope.sortLastNameAscending == false && $scope.sortLastNameDescending == false){
                $scope.sortLastNameAscending = true;
                $scope.reservations.sort(compareLastName);
            }
            else if($scope.sortLastNameAscending == true && $scope.sortLastNameDescending == false){
                $scope.sortLastNameDescending = true;
                $scope.sortLastNameAscending = false;
                $scope.reservations.sort(compareLastName).reverse();
            }
            else if($scope.sortLastNameAscending == false && $scope.sortLastNameDescending == true){
                $scope.sortLastNameDescending = false;
                $scope.sortLastNameAscending = true;
                $scope.reservations.sort(compareLastName);
            }
            $scope.sorted = true;
            $scope.sortUsernameAscending = false;
            $scope.sortUsernameDescending = false;
            $scope.sortFirstNameAscending = false;
            $scope.sortFirstNameDescending = false;
        };

        if($rootScope.user) getAllReservations();

        $scope.selectedReservation = {};
        $scope.addReservation = function(){
            var newReservation = {};
            //newUser.roles = selectedUser.roles.split(",");
            //delete selectedUser.roles;
            for(var attr in $scope.selectedReservation){
                newReservation[attr] = $scope.selectedReservation[attr];
            }
            ReservationService.createReservation(newReservation.studentId, newReservation.tutorId, newReservation.field,
            newReservation.time, newReservation.location, newReservation.duration, newReservation.price).then(function(retVal){
                getAllReservations();
            });
            $scope.selectedReservation = {};
        };

        $scope.updateReservation = function(){
            var newReservation = {};
            var ReservationId = $scope.selectedReservation._id;
            for(var attr in $scope.selectedReservation){
                newReservation[attr] = $scope.selectedReservation[attr];
            }

            ReservationService.updateReservationById(ReservationId, newReservation).then(function(retVal){
                getAllReservations();
            });
            $scope.selectedReservation = {};
        };

        $scope.editReservation = function(reservation){
            for(var attr in reservation){
                $scope.selectedReservation[attr] = reservation[attr];
            }
        };

        $scope.deleteReservation = function(reservation){
            var reservationId = reservation._id;
            ReservationService.deleteReservationById(reservationId).then(function(retVal){
                getAllReservations();
            });
        };

        function getAllReservations() {
            ReservationService.findAllReservation().then(function(retVal){
                console.log(retVal.data);
                $scope.reservations = retVal.data;
            });
            console.log($scope.reservations);
        }
    }
})();