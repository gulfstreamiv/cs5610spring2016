"use strict";

var formArray = require("form.mock.json");
var uuid = require("node-uuid");

module.exports = function(app) {

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
        form._id = uuid.v4();
        formArray.push(form);
        return formArray;
    }

    function FindAll(){
        return formArray;
    }

    function FindById(id){
        for(var i = 0; i<formArray.length; i++){
            if(formArray[i]._id == id){
                return formArray[i];
            }
        }
        return null;
    }

    function Update(id, form){
        for(var i = 0; i<formArray.length; i++){
            if(formArray[i]._id == id){
                formArray[i].title = form.title;
                formArray[i].userId = form.userId;
                formArray[i].fields = form.fields;
            }
        }
    }

    function Delete(id){
        for(var i = 0; i<formArray.length; i++) {
            if (formArray[i]._id == id) {
                formArray.splice(i, 1);
            }
        }
    }

    function findFormByTitle(title){
        for(var i = 0; i<formArray.length; i++) {
            if (formArray[i].title == title) {
                return formArray[i];
            }
        }
        return null;
    }

    function findFormByUserId(userId){
        var temp = [];
        for(var i = 0; i<formArray.length; i++){
            if(formArray[i].userId == userid){
                temp.push(formArray[i]);
            }
        }
        return temp;
    }

    function findFieldByFormId(formId){
        var form = FindById(formId);
        if(form) return form.fields;
        else return null;
    }

    function findFieldByFieldIdFormId(fieldId, formId){
        var form = FindById(formId);
        for(var i = 0; i<form.fields.length; i++){
            if(form.fields[i]._id == fieldId)
                return form.fields[i];
        }
        return null;
    }

    function deleteByFieldIdFormId(fieldId, formId){
        var form = FindById(formId);
        for(var i = 0; i<form.fields.length; i++){
            if(form.fields[i]._id == fieldId)
                form.fields.splice(i, 1);
        }
        return form.fields;
    }

    function CreateField(formId, field){
        field._id = uuid.v4();
        var form = FindById(formId);
        form.fields.push(field);
        return form.fields;
    }

    function updateByFieldIdFormId(fieldId, formId, field){
        var form = FindById(formId);
        for(var i = 0; i<form.fields.length; i++){
            if(form.fields[i]._id == fieldId){
                for(var attribute in field){
                    form.fields[i][attribute] = field[attribute];
                }
            }
        }
    }

};
