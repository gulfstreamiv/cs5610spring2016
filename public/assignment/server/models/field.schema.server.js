"use strict";
module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var fieldSchema = new Schema(
        {
            _id : Number,
            label : String,
            type: {
                type: String,
                enum: ["TEXT", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
            },
            placeholder : String,
            options : [{label:String, value:String}]
        });

    return fieldSchema;
};