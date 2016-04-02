"use strict";
module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    var fieldSchema = new Schema(
        {
            id : String,
            label : String,
            type: {
                type: String,
                enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
            },
            placeholder : String,
            options : [{label:String, value:String}]
        });

    return fieldSchema;
};