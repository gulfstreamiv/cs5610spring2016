(function (){
    "use strict";
    angular.module("FormBuilderApp").factory("ReservationService", ReservationService);

    function ReservationService() {

        var reservationArray = [
            {"_id": "000", "studentId": 321, "tutorId": 123, "field":"Computer Science", "time" : 14, "location":"SLU", "duration": 45, "price":14},
        ];

        var ServiceType = {
            createReservation: createReservation,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return ServiceType;

        function createReservation(sid, tid, field, time, location, duration, callback){
            var reservation = {};
            reservation._id = new Date().getTime();
            reservation.sid = sid;
            reservation.tid = tid;
            reservation.field = field;
            reservation.time = time;
            reservation.location = location;
            reservation.duration = duration;
            reservationArray.push(reservation);
            callback(reservation);
        }

        function findAllFormsForUser(userId, callback){
            var temp = [];
            for(var i = 0; i<formArray.length; i++){
                if(formArray[i].userId == userId){
                    temp.push(formArray[i]);
                }
            }
            callback(temp);
        }

        function deleteFormById(formId, callback){
            for(var i = 0; i < formArray.length; i++){
                if(formArray[i]._id == formId){
                    formArray.splice(i, 1);
                }
            }
            callback(formArray);
        }

        function updateFormById(formId, newForm, callback) {
            for(var i = 0; i<formArray.length; i++){
                if(formArray[i]._id == formId){
                    formArray[i].title = newForm.title;
                    //   formArray[i].userId = newForm.userId;
                    callback(formArray[i]);
                }
            }
        }

    }
}) ();