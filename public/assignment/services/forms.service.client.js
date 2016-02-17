(function (){
    "use strict";
    angular.module("FormBuilderApp").factory("FormService", FormService);

    function FormService() {
        var formArray = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var ServiceType = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return ServiceType;

        function createFormForUser(userId, form, callback){
            form._id = new Date().getTime();
            form.userId = userId;
            formArray.push(form);
            callback(form);
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