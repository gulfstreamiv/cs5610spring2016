(function() {
    "use strict";
    angular.module("TutorApp").controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();