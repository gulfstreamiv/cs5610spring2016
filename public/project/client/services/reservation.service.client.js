(function (){
    "use strict";
    angular.module("TutorApp").factory("ReservationService", ReservationService);

    function ReservationService($http, $q) {

        var reservationArray = [
            {"_id": "fj1aohr83", "studentId": 789, "tutorId": 890, "field":"Computer Science", "time" : 14, "location":"SLU", "duration": 45, "price":14.00},
            {"_id": "369jfsio9si8329fh", "studentId": 789, "tutorId": 123, "field":"Computer Science", "time" : 12, "location":"UW", "duration": 120, "price":20.00}
        ];

        var ServiceType = {
            createReservation: createReservation,
            findAllReservationsForStudent: findAllReservationsForStudent,
            findAllReservationsForTutor: findAllReservationsForTutor,
            deleteReservationById: deleteReservationById,
            updateReservationById: updateReservationById,
            findReservationById : findReservationById,
            findAllReservation : findAllReservation
        };

        return ServiceType;

        function findAllReservation(){
            var deferred = $q.defer();
            $http.get('/api/project/admin/reservation').then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function createReservation(sid, tid, field, time, location, duration, price){
            var reservation = {};
            reservation._id = new Date().getTime();
            reservation.studentId = sid;
            reservation.tutorId = tid;
            reservation.field = field;
            reservation.time = time;
            reservation.location = location;
            reservation.duration = duration;
            reservation.price = price;
            //reservationArray.push(reservation);
            //callback(reservation);
            var deferred = $q.defer();
            $http.post('/api/project/reservation', reservation).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function findReservationById(rid){
            //for(var i = 0; i<reservationArray.length; i++){
            //    if(reservationArray[i]._id == rid){
            //        callback(reservationArray[i]);
            //    }
            //}
            var deferred = $q.defer();
            $http.get('/api/project/reservation/'+rid).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function findAllReservationsForStudent(sid){
            //var temp = [];
            //for(var i = 0; i<reservationArray.length; i++){
            //    if(reservationArray[i].studentId == sid){
            //        temp.push(reservationArray[i]);
            //    }
            //}
            //callback(temp);
            console.log("called student history on Client side!"+" with sid= " + sid);
            var deferred = $q.defer();
            $http.get('/api/project/reservation/student/'+sid).then(function(retVal){
                console.log("reservation client side return with " + retVal);
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function findAllReservationsForTutor(tid){
            //var temp = [];
            //for(var i = 0; i<reservationArray.length; i++){
            //    if(reservationArray[i].tutorId == tid){
            //        temp.push(reservationArray[i]);
            //    }
            //}
            //callback(temp);
            var deferred = $q.defer();
            $http.get('/api/project/reservation/tutor/'+tid).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function deleteReservationById(rid){
            //for(var i = 0; i < reservationArray.length; i++){
            //    if(reservationArray[i]._id == rid){
            //        reservationArray.splice(i, 1);
            //    }
            //}
            //callback(reservationArray);
            var deferred = $q.defer();
            $http.delete('/api/project/reservation/'+rid).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function updateReservationById(rid, newOrder) {
            //for(var i = 0; i<reservationArray.length; i++){
            //    if(reservationArray[i]._id == rid){
            //        console.log("updating order: " + rid + "from service");
            //        for(var attribute in newOrder){
            //            reservationArray[i][attribute] = newOrder[attribute];
            //        }
            //        callback(reservationArray);
            //    }
            //}
            var deferred = $q.defer();
            $http.put('/api/project/reservation/'+rid, newOrder).then(function(retVal){
                deferred.resolve(retVal);
            });
            console.log("succesfully updated reservation");
            return deferred.promise;
        }

    }
}) ();