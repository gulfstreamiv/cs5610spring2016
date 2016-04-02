(function() {
    "use strict";
    angular.module("FormBuilderApp").controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService){
        var thisCtrl = this;
        var uid = $routeParams.userId;
        var formId = $routeParams.formId;

        FieldService.getFieldsForForm(formId).then(function(retVal){
            thisCtrl.fields = retVal.data;
            $scope.fieldArray = retVal.data;
            console.log(thisCtrl.fields);
        });

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
                console.log(thisCtrl.fields);
            })

        };

        thisCtrl.removeField = function(field){
            FieldService.deleteFieldFromForm(formId, field.id).then(function(retVal){
                thisCtrl.fields = retVal.data;
            })
        };

        //sortable [import $scope because of this]
        //$scope.fieldArray = thisCtrl.fields;
        var sortableEle;
        $scope.dragStart = function(e, ui) {
            ui.item.data('start', ui.item.index());
        };
        $scope.dragEnd = function(e, ui) {
            var start = ui.item.data('start'),
                end = ui.item.index();

            $scope.fieldArray.splice(end, 0,
                $scope.fieldArray.splice(start, 1)[0]);

            $scope.$apply();
        };

        sortableEle = $('#sortable').sortable({
            start: $scope.dragStart,
            update: $scope.dragEnd
        });

        //edit single/multi line field
        thisCtrl.editLine = function(fieldId){
            var newField = {};
            newField.label = thisCtrl.edit.label;
            newField.placeholder = thisCtrl.edit.placeholder;
            FieldService.updateField(formId, fieldId, newField).then(function(retVal){
                thisCtrl.fields = retVal.data;
            });
            thisCtrl.edit = {}; //restore edit field
            $(".modal-backdrop").hide();  //close after ngclick
            $('body').removeClass('modal-open');  //scrollbar fix
        };


        //edit options
        this.editOption = function(fieldId){
            var newField = {};
            newField.label = thisCtrl.edit.label;
            newField.options = [];
            for(var i = 0; i<thisCtrl.edit.options.length; i++){
                var temp = {};
                var array = thisCtrl.edit.options[i].split(':');
                temp.label = array[0];
                temp.value = array[1];
                newField.options.push(temp);
            }
            FieldService.updateField(formId, fieldId, newField).then(function(retVal){
                thisCtrl.fields = retVal.data;
            });
            thisCtrl.edit = {};
            $(".modal-backdrop").hide();
            $('body').removeClass('modal-open');
        }

    }
})();