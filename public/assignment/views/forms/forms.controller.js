(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService){
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var currentUser = $rootScope.user;

        if(!currentUser) alert("Can't retrieve forms. You are not logged in yet.");
        else $scope.forms = getForms();


        function addForm(){
            var newForm = {
                title : $scope.form.name
            };
            FormService.createFormForUser(currentUser._id, newForm, function(retVal){
                $scope.forms.push(retVal);
            });
        }

        function updateForm(){
            if($scope.selectedForm)
                FormService.updateFormById($scope.selectedForm._id, $scope.form, function(retVal){

                });
        }

        function deleteForm(index){
            FormService.deleteFormById(index, function(retVal){

            })
        }

        function selectForm(index){
            $scope.selectedForm = forms[index];
            $scope.form.title = $scope.selectedForm.title;
        }

        function getForms(){
            FormService.findAllFormsForUser(123, function(forms){
                $scope.forms = forms;
            });
        }
    }
}) ();