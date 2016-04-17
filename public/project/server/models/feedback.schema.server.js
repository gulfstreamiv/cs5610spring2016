"use strict";
module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var feedbackSchema = new Schema(
        {
            _id : Number,
            user_id : Number,
            feedback : String,
            rating : Number,
            date : Date
        },
        {collection: "feedbackProject"});

    return feedbackSchema;
};



