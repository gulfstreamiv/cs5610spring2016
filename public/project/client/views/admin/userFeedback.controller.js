(function() {
    "use strict";
    angular.module("TutorApp").controller("FeedbackMgmtController", FeedbackMgmtController);

    function FeedbackMgmtController($rootScope, $scope, $location, UserService){
        $scope.sorted = false;
        $scope.sortUsernameAscending = false;
        $scope.sortUsernameDescending = false;
        $scope.sortFirstNameAscending = false;
        $scope.sortFirstNameDescending = false;
        $scope.sortLastNameAscending = false;
        $scope.sortLastNameDescending = false;

        function compareUsername(a,b) {
            if (a.user_id < b.user_id)
                return -1;
            else if (a.user_id > b.user_id)
                return 1;
            else
                return 0;
        }

        function compareFirstName(a,b) {
            if (a.date < b.date)
                return -1;
            else if (a.date > b.date)
                return 1;
            else
                return 0;
        }

        function compareLastName(a, b){
            if (a.rating < b.rating)
                return -1;
            else if (a.rating > b.rating)
                return 1;
            else
                return 0;
        }

        $scope.showSortUserNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortUsernameAscending;
        };

        $scope.showSortUserNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortUsernameDescending;
        };

        $scope.showSortFirstNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortFirstNameAscending;
        };

        $scope.showSortFirstNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortFirstNameDescending;
        };

        $scope.showSortLastNameAscending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortLastNameAscending;
        };

        $scope.showSortLastNameDescending = function(){
            if($scope.sorted == false) return false;
            return $scope.sortLastNameDescending;
        };

        //$scope.refreshByUsername = function(){
        //    UserService.getAllUsers().then(function(retVal){
        //        sortByUsername(retVal.data);
        //        $scope.users.sort(compareUsername).reverse();
        //        console.log($scope.users);
        //    });
        //};

        $scope.sortByUsername = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortUsernameAscending = true;
                $scope.feedbacks.sort(compareUsername);
            }
            else if($scope.sortUsernameAscending == false && $scope.sortUsernameDescending == false){
                $scope.sortUsernameAscending = true;
                $scope.feedbacks.sort(compareUsername);
            }
            else if($scope.sortUsernameAscending == true && $scope.sortUsernameDescending == false){
                $scope.sortUsernameDescending = true;
                $scope.sortUsernameAscending = false;
                $scope.feedbacks.sort(compareUsername).reverse();
            }
            else if($scope.sortUsernameAscending == false && $scope.sortUsernameDescending == true){
                $scope.sortUsernameDescending = false;
                $scope.sortUsernameAscending = true;
                $scope.feedbacks.sort(compareUsername);
            }
            $scope.sorted = true;
            $scope.sortFirstNameAscending = false;
            $scope.sortFirstNameDescending = false;
            $scope.sortLastNameAscending = false;
            $scope.sortLastNameDescending = false;
        };

        $scope.sortByFirstName = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortFirstNameAscending = true;
                $scope.feedbacks.sort(compareFirstName);
            }
            else if($scope.sortFirstNameAscending == false && $scope.sortFirstNameDescending == false){
                $scope.sortFirstNameAscending = true;
                $scope.feedbacks.sort(compareFirstName);
            }
            else if($scope.sortFirstNameAscending == true && $scope.sortFirstNameDescending == false){
                $scope.sortFirstNameDescending = true;
                $scope.sortFirstNameAscending = false;
                $scope.feedbacks.sort(compareFirstName).reverse();
            }
            else if($scope.sortFirstNameAscending == false && $scope.sortFirstNameDescending == true){
                $scope.sortFirstNameDescending = false;
                $scope.sortFirstNameAscending = true;
                $scope.feedbacks.sort(compareFirstName);
            }
            $scope.sorted = true;
            $scope.sortUsernameAscending = false;
            $scope.sortUsernameDescending = false;
            $scope.sortLastNameAscending = false;
            $scope.sortLastNameDescending = false;
        };

        $scope.sortByLastName = function(){
            //getAllUsers();
            if($scope.sorted == false){
                $scope.sortLastNameAscending = true;
                $scope.feedbacks.sort(compareLastName);
            }
            else if($scope.sortLastNameAscending == false && $scope.sortLastNameDescending == false){
                $scope.sortLastNameAscending = true;
                $scope.feedbacks.sort(compareLastName);
            }
            else if($scope.sortLastNameAscending == true && $scope.sortLastNameDescending == false){
                $scope.sortLastNameDescending = true;
                $scope.sortLastNameAscending = false;
                $scope.feedbacks.sort(compareLastName).reverse();
            }
            else if($scope.sortLastNameAscending == false && $scope.sortLastNameDescending == true){
                $scope.sortLastNameDescending = false;
                $scope.sortLastNameAscending = true;
                $scope.feedbacks.sort(compareLastName);
            }
            $scope.sorted = true;
            $scope.sortUsernameAscending = false;
            $scope.sortUsernameDescending = false;
            $scope.sortFirstNameAscending = false;
            $scope.sortFirstNameDescending = false;
        };

        if($rootScope.user) getAllFeedback();

        $scope.selectedFeedback = {};
        $scope.addFeedback = function(){
            var newFeedback = {};
            //newUser.roles = selectedUser.roles.split(",");
            //delete selectedUser.roles;
            for(var attr in $scope.selectedFeedback){
                newFeedback[attr] = $scope.selectedFeedback[attr];
            }
            UserService.addFeedback(newFeedback).then(function(retVal){
                getAllFeedback();
            });
            $scope.selectedFeedback = {};
        };

        $scope.updateFeedback = function(){
            var newFeedback = {};
            var feedbackId = $scope.selectedFeedback._id;
            for(var attr in $scope.selectedFeedback){
                newFeedback[attr] = $scope.selectedFeedback[attr];
            }

            UserService.editFeedback(feedbackId, newFeedback).then(function(retVal){
                getAllFeedback();
            });
            $scope.selectedFeedback = {};
        };

        $scope.editFeedback = function(feedback){
            for(var attr in feedback){
                $scope.selectedFeedback[attr] = feedback[attr];
            }
        };

        $scope.deleteFeedback = function(feedback){
            var feedbackId = feedback._id;
            UserService.deleteFeedback(feedbackId).then(function(retVal){
                getAllFeedback();
            });
        };

        function getAllFeedback() {
            UserService.getFeedback().then(function(retVal){
                console.log(retVal.data);
                $scope.feedbacks = retVal.data;
            });
            console.log($scope.feedbacks);
        }

    }
})();