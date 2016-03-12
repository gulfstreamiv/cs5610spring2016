(function (){
    "use strict";
    angular.module("FormBuilderApp").factory("ReservationService", ReservationService);

    function ReservationService() {

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
            findReservationById : findReservationById
        };

        return ServiceType;

        function createReservation(sid, tid, field, time, location, duration, price, callback){
            var reservation = {};
            reservation._id = new Date().getTime();
            reservation.studentId = sid;
            reservation.tutorId = tid;
            reservation.field = field;
            reservation.time = time;
            reservation.location = location;
            reservation.duration = duration;
            reservation.price = price;
            reservationArray.push(reservation);
            callback(reservation);
        }

        function findReservationById(rid, callback){
            for(var i = 0; i<reservationArray.length; i++){
                if(reservationArray[i]._id == rid){
                    callback(reservationArray[i]);
                }
            }
        }

        function findAllReservationsForStudent(sid, callback){
            var temp = [];
            for(var i = 0; i<reservationArray.length; i++){
                if(reservationArray[i].studentId == sid){
                    temp.push(reservationArray[i]);
                }
            }
            callback(temp);
        }

        function findAllReservationsForTutor(tid, callback){
            var temp = [];
            for(var i = 0; i<reservationArray.length; i++){
                if(reservationArray[i].tutorId == tid){
                    temp.push(reservationArray[i]);
                }
            }
            callback(temp);
        }

        function deleteReservationById(rid, callback){
            for(var i = 0; i < reservationArray.length; i++){
                if(reservationArray[i]._id == rid){
                    reservationArray.splice(i, 1);
                }
            }
            callback(reservationArray);
        }

        function updateReservationById(rid, newOrder, callback) {
            for(var i = 0; i<reservationArray.length; i++){
                if(reservationArray[i]._id == rid){
                    for(var attribute in newOrder){
                        reservationArray[i][attribute] = newOrder[attribute];
                    }
                    callback(reservationArray);
                }
            }
        }

    }
}) ();