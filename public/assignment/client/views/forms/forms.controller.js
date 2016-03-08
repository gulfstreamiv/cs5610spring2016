(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService){

        var currentUser = $rootScope.user;
        $scope.updatedForm = {};
        $scope.form = {};
        $scope.form.title = "";
        $scope.currentUser = currentUser;

        if(!currentUser) alert("Can't retrieve forms. You are not logged in yet.");
        else getForms();


        $scope.addForm = function(){
            var newForm = {
                title : $scope.form.title
            };
            FormService.createFormForUser(currentUser._id, newForm).then(function(retVal){
                console.log(retVal.data);
                $scope.form.title = "";
            });
            getForms();
        };

        $scope.updateForm = function(){
            if($scope.selectedForm) {
                $scope.updatedForm.userId = currentUser._id;
                $scope.updatedForm = $scope.selectedForm;
                $scope.updatedForm.title = $scope.form.title;
                FormService.updateFormById($scope.selectedForm._id, $scope.updatedForm).then(function (retVal) {
                    getForms();
                });
            }
        };

        $scope.deleteForm = function(index){
            FormService.deleteFormById($scope.forms[index]._id).then(function(retVal){
                getForms();
            });
        };

        $scope.selectForm = function(index){
            $scope.selectedForm = $scope.forms[index];
            $scope.form.title = $scope.selectedForm.title;
        };

        function getForms(){
            FormService.findAllFormsForUser(currentUser._id).then(function(retVal){
                $scope.forms = retVal.data;
                console.log(retVal.data);
            });
        }

    }
}) ();