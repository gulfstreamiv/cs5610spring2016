"use strict";
var formArray = require("./form.mock.json");
var uuid = require("node-uuid");
var q = require("q");

module.exports = function(app, mongoose, db) {
    var formSchema = require("./form.schema.server.js")(mongoose);
    var formModel = mongoose.model("formModel", formSchema);
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model("fieldModel", fieldSchema);

    formArray.forEach(function(element, index, array){
        Create(element);
    });

    var serviceType = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        //Form model
        findFormByTitle : findFormByTitle,
        findFormByUserId : findFormByUserId,
        //Field model
        findFieldByFormId : findFieldByFormId,
        findFieldByFieldIdFormId : findFieldByFieldIdFormId,
        deleteByFieldIdFormId : deleteByFieldIdFormId,
        CreateField : CreateField,
        updateByFieldIdFormId : updateByFieldIdFormId
    };

    return serviceType;

    function Create(form){
        var toInsert = {};
        for(var attribute in form){
            toInsert[attribute] = form[attribute];
        }
        //formArray.push(form);
        //return formArray;
        var deferred = q.defer();
        if(!toInsert._id) toInsert._id = uuid.v4();
        var formatted = new formModel(toInsert);
        formModel.create(formatted, function(err, retVal){
            formModel.find(function(err, retVal){
                deferred.resolve(retVal);
                console.log("Inserting forms..."+formatted._id)
            });
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        formModel.find(function(err, retVal){
            deferred.resolve(retVal);
        });
        return deferred.promie;
        //return formArray;
    }

    function FindById(id){
        //for(var i = 0; i<formArray.length; i++){
        //    if(formArray[i]._id == id){
        //        return formArray[i];
        //    }
        //}
        //return null;
        var deferred = q.defer();
        var condition = {_id : id};
        formModel.findById(condition, function(err, retVal){
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }

    function Update(id, form){
        //for(var i = 0; i<formArray.length; i++){
        //    if(formArray[i]._id == id){
        //        for(var attribute in form){
        //            formArray[i][attribute] = form[attribute];
        //        }
        //        //formArray[i].title = form.title;
        //        //formArray[i].userId = form.userId;
        //        //formArray[i].fields = form.fields;
        //    }
        //}
        //return formArray;
        var deferred = q.defer();
        var condition = {_id:id};
        //delete form._id;
        formModel.findOne(condition, function(err, retVal){
            if(err) deferred.reject(err);
            for(var attribute in form){
                retVal[attribute] = form[attribute];
            }
            retVal.save(function(err, retForm){
                formModel.find(function(err, formArray){
                    deferred.resolve(formArray);
                });
            });
        });
        return deferred.promise;
    }

    function Delete(id){
        //for(var i = 0; i<formArray.length; i++) {
        //    if (formArray[i]._id == id) {
        //        formArray.splice(i, 1);
        //    }
        //}
        //return formArray;
        var deferred = q.defer();
        var condition = {_id:id};
        formModel.remove(condition, function(err, retVal){
            if(err) {
                deferred.reject(err);
            } else {
                formModel.find(function(err, formArray) {
                    deferred.resolve(formArray);
                });
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title){
        //for(var i = 0; i<formArray.length; i++) {
        //    if (formArray[i].title == title) {
        //        return formArray[i];
        //    }
        //}
        //return null;
        var deferred = q.defer();
        var condition = {title : title};
        formModel.find(condition, function(err, retVal){
            if(err) deferred.reject(err);
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }

    function findFormByUserId(userId){
        //var temp = [];
        //for(var i = 0; i<formArray.length; i++){
        //    if(formArray[i].userId == userId){
        //        temp.push(formArray[i]);
        //    }
        //}
        //return temp;
        var deferred = q.defer();
        var condition = {userId : userId};
        formModel.find(condition, function(err, retVal){
            if(err) deferred.reject(err);
            deferred.resolve(retVal);
        });
        return deferred.promise;
    }

    //Field

    function findFieldByFormId(formId){
        //var form = FindById(formId);
        //if(form) return form.fields;
        //else return null;
        console.log("received formId is: " + formId);
        var deferred = q.defer();
        var condition = {_id : String(formId)};
        console.log(condition);
        formModel.findOne(condition, function(err, retVal){
            if(err) deferred.reject(err);
            console.log(retVal);
            deferred.resolve(retVal.fields);
        });
        return deferred.promise;
    }

    function findFieldByFieldIdFormId(fieldId, formId){
        //var form = FindById(formId);
        //for(var i = 0; i<form.fields.length; i++){
        //    if(form.fields[i]._id == fieldId)
        //        return form.fields[i];
        //}
        //return null;
        var deferred = q.defer();
        var condition = {formId : formId};
        formModel.findOne(condition, function(err, retVal){
            if(err) deferred.reject(err);
            retVal.findOne({id : fieldId}, function(err, field){
                deferred.resolve(field);
            });
        });
        return deferred.promise;
    }

    function deleteByFieldIdFormId(fieldId, formId){
        //var form = FindById(formId);
        //for(var i = 0; i<form.fields.length; i++){
        //    if(form.fields[i]._id == fieldId)
        //        form.fields.splice(i, 1);
        //}
        //return form.fields;
        var deferred = q.defer();
        var condition = {_id:formId};
        formModel.findOne(condition, function(err, retForm){
            if(err) deferred.reject(err);
            var fieldIndex = retForm.fields.findIndex(function(element, index, array){
                return element.id == fieldId;
            });
            retForm.fields.splice(fieldIndex, 1);
            //var toUpdate = {};
            //for(var attr in retForm){
            //    toUpdate[attr] = retForm[attr];
            //}
            var temp = retForm._id;
            delete retForm._id;
            formModel.update({_id:temp}, retForm, function(err, retVal){
                if(err) deferred.reject(err);
                deferred.resolve(retForm.fields);
            });
            //retForm.save(function(err, retVal){
            //    if(err) deferred.reject(err);
            //    deferred.resolve(retForm.fields);
            //});
        });
        return deferred.promise;
    }

    function CreateField(formId, field){
        field.id = uuid.v4();
        //var form = FindById(formId);
        //form.fields.push(field);
        //return form.fields;
        var deferred = q.defer();
        formModel.findOne({_id:formId}, function(err, retVal){
            var formattedField = new fieldModel(field);
            retVal.fields.push(formattedField);
            retVal.save(function(err, retForm){
                formModel.findOne({_id:formId}, function(err, retVal){
                    deferred.resolve(retVal.fields);
                });
            })
        });
        return deferred.promise;
    }

    function updateByFieldIdFormId(fieldId, formId, field){
        //var form = FindById(formId);
        //for(var i = 0; i<form.fields.length; i++){
        //    if(form.fields[i]._id == fieldId){
        //        for(var attribute in field){
        //            form.fields[i][attribute] = field[attribute];
        //        }
        //    }
        //}
        //return form.fields;
        var deferred  = q.defer();
        var condition = {_id : formId};
        formModel.findOne(condition, function(err, retForm){
            if(err) deferred.reject(err);
            var fieldIndex = retForm.fields.findIndex(function(element, index, array){
                return element.id == fieldId;
            });
            for(var attribute in field){
                retForm.fields[fieldIndex][attribute] = field[attribute];
            }
            var temp = retForm._id;
            delete retForm._id;
            formModel.update({_id:temp}, retForm, function(retVal){
                if(err) deferred.reject(err);
                deferred.resolve(retForm.fields);
            });
            //retForm.save(function(err, retVal){
            //    if(err) deferred.reject(err);
            //    deferred.resolve(retForm.fields);
            //});
        });
        return deferred.promise;
    }

};
