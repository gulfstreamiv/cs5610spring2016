(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SelectionController", SelectionController);

    function SelectionController($rootScope, $scope, $routeParams, UserService){
        $scope.uid = $routeParams.uid;
        $scope.field = $routeParams.field;
        $scope.location = $routeParams.location;
        $scope.duration = $routeParams.duration;
        $scope.time = $routeParams.time;

        if($rootScope.user!=null) getTutors();

        function getTutors() {
            UserService.findByLocationField($routeParams.location, $routeParams.field, function (retVal) {
                $scope.availableTutors = retVal;
            });
        }

    }
})();