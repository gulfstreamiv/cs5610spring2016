(function () {
    "use strict";
    angular.module("FormBuilderApp").factory("FieldService", FieldService);

    function FieldService($http, $q){

        var serviceType = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return serviceType;

        function createFieldForForm(formId, field){
            var deferred = $q.defer();
            $http.post('/api/assignment/form/'+formId+'/field', field).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function getFieldsForForm(formId){
            var deferred = $q.defer();
            $http.get('/api/assignment/form/'+formId+'/field').then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId){
            var deferred = $q.defer();
            $http.get('/api/assignment/form/'+formId+'/field/'+fieldId).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId){
            var deferred = $q.defer();
            $http.delete('/api/assignment/form/'+formId+'/field/'+fieldId).then(function(retVal){
                deferred.resolve(retVal);
            }, function(reason){$q.reject(reason)});
            return deferred.promise;
        }

        function updateField(formId, fieldId, field){
            var deferred = $q.defer();
            $http.put('/api/assignment/form/'+formId+'/field/'+fieldId, field).then(function(retVal){
                deferred.resolve(retVal);
            }, function(reason){$q.reject(reason)});
            return deferred.promise;
        }
    }

}) ();