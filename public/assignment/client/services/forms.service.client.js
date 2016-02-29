(function (){
    "use strict";
    angular.module("FormBuilderApp").factory("FormService", FormService);

    function FormService($http, $q) {

        var ServiceType = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return ServiceType;

        function createFormForUser(userId, form){
            var deferred = $q.defer();
            $http.post('/api/assignment/user/'+userId+'/form', form).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            $http.get('/api/assignment/user/'+userId+'/form').then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            $http.delete('/api/assignment/form/'+formId).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put('/api/assignment/form/'+formId, newForm).then(function(retVal){
                deferred.resolve(retVal);
            });
            return deferred.promise;
        }

    }
}) ();