(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService){
        var thisCtrl = this;
        var uid = $routeParams.userId;
        var formId = $routeParams.formId;

        FieldService.getFieldsForForm(formId).then(function(retVal){
            thisCtrl.fields = retVal.data;
        });

        console.log(thisCtrl.fields);

        thisCtrl.addField = function(fieldType) {
            var field = {};
            switch (fieldType) {
                case "singlelinetext":
                    field.label = "New Text Field";
                    field.type = "TEXT";
                    field.placeholder = "New Field";
                    break;
                case "multilinetext":
                    field.label = "New Text Field";
                    field.type = "TEXTAREA";
                    field.placeholder = "New Field";
                    break;
                case "date":
                    field.label = "New Date";
                    field.type = "DATE";
                    break;
                case "dropdown":
                    field.label = "New Dropdown";
                    field.type = "OPTIONS";
                    field.options = [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ];
                    break;
                case "checkbox":
                    field.label = "New Checkboxes";
                    field.type = "CHECKBOXES";
                    field.options = [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ];
                    break;
                case "radio":
                    field.label = "New Radio Buttons";
                    field.type = "RADIOS";
                    field.options = [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ];
                    break;
            }

            FieldService.createFieldForForm(formId, field).then(function(retVal){
                thisCtrl.fields = retVal.data;
            })

        };

        thisCtrl.removeField = function(field){
            FieldService.deleteFieldFromForm(formId, field._id).then(function(retVal){
                thisCtrl.fields = retVal.data;
            })
        }
    }

})();