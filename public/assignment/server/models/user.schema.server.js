"use strict";
module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var userSchema = new Schema(
        {
            _id : String,
            username : String,
            password : String,
            firstName : String,
            lastName : String,
            emails : [String],
            phones : [String]
        },
        {collection: "user"});

    return userSchema;
};



