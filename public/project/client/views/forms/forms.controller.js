(function() {
    "use strict";
    angular.module("TutorApp").controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService){

        var currentUser = $rootScope.user;
        $scope.updatedForm = {};
        $scope.form = {};
        $scope.form.title = "";

        if(!currentUser) alert("Can't retrieve forms. You are not logged in yet.");
        else getForms();


        $scope.addForm = function(){
            var newForm = {
                title : $scope.form.title
            };
            FormService.createFormForUser(currentUser._id, newForm, function(retVal){
                $scope.forms.push(retVal);
            });
        };

        $scope.updateForm = function(){
            if($scope.selectedForm)
                $scope.updatedForm.title = $scope.form.title;
                FormService.updateFormById($scope.selectedForm._id, $scope.updatedForm, function(retVal){
                    getForms();
                });
        };

        $scope.deleteForm = function(index){
            FormService.deleteFormById($scope.forms[index]._id, function(retVal){
                getForms();
            });
        };

        $scope.selectForm = function(index){
            $scope.selectedForm = $scope.forms[index];
            $scope.form.title = $scope.selectedForm.title;
        };

        function getForms(){
            FormService.findAllFormsForUser(currentUser._id, function(retVal){
                $scope.forms = retVal;
            });
        }

    }
}) ();