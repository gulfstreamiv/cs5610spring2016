(function() {
    "use strict";
    angular.module("TutorApp").controller("FeedbackController", FeedBackController);

    function FeedBackController($rootScope, $scope, $location, UserService){
        $scope.user = $rootScope.user;
        $scope.feed = {};

        $scope.ifLoggedIn = function(){
            return $rootScope.user;
        };

        $scope.getUsername = function(){
            if($rootScope.user)
                return $rootScope.user.username;
            return null;
        };

        $scope.createFeedback = function(){
            var toInsert = {};
            toInsert._id = new Date().getTime();
            toInsert.userId = $scope.user._id;
            toInsert.feedback = $scope.feed.review;
            toInsert.rating = $scope.feed.rating;
            console.log("ready to add feedback!");
            UserService.addFeedback(toInsert).then(function(retVal){
                console.log(retVal.data);
                alert("Your feedback has been logged. Thank you for your time!");
                if($scope.user.type.indexOf("student") != -1) $location.path('studenthome');
                else if($scope.user.type.indexOf("tutor") != -1) $location.path('tutorhome');
                else $location.path('home');
            });
        }
    }
})();