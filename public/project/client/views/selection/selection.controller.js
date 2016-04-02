(function(){
    "use strict";
    angular
        .module("TutorApp")
        .controller("SelectionController", SelectionController);

    function SelectionController($rootScope, $scope, $routeParams, UserService){
        $scope.uid = $routeParams.uid;
        $scope.field = $routeParams.field;
        $scope.location = $routeParams.location;
        $scope.duration = $routeParams.duration;
        $scope.time = $routeParams.time;

        if($rootScope.user!=null) getTutors();

        function getTutors() {
            console.log("called get Tutors!");
            UserService.findByLocationField($routeParams.location, $routeParams.field).then(function (retVal) {
                console.log(retVal.data);
                $scope.availableTutors = retVal.data;
            });
        }

    }
})();