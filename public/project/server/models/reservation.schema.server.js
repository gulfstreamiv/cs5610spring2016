"use strict";
module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var reservationSchema = new Schema(
        {
            _id : Number,
            studentId : Number,
            tutorId : Number,
            field : String,
            time : Number,
            location : String,
            duration : Number,
            price : Number
        },
        {collection: "reservationProject"});

    return reservationSchema;
};