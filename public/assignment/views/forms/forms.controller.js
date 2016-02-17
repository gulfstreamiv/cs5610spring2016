(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService){
        $scope.$location = $location
        $scope.addForm = addForm;

        $scope.forms = getForms();

        var currentUser = $rootscope.user;
        var uid = currentUser._id;

        function addForm(){
            var newForm = {
                title : $scope.form.name
            }
            FormService.createFormForUser(uid, newForm, function(retVal){
                $scope.forms.push(retVal);
            })
        }

        function updateForm(){
            FormService.updateFormById()
        }

        function getForms(){
            FormService.findAllFormsForUser(uid, function(forms){
                $scope.forms = forms;
            })
        }
    };
})