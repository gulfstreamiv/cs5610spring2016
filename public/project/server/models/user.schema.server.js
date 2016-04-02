"use strict";
module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var userSchema = new Schema(
        {
            _id : Number,
            firstName : String,
            lastName : String,
            username : String,
            password : String,
            roles : [String],
            email : String,
            type : String,
            field : String,
            location : String,
            price : Number
        },
        {collection: "userProject"});

    return userSchema;
};



