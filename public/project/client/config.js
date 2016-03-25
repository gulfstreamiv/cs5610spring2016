(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider
            .when("/home", {
                controller: "HomeController",
                templateUrl: "views/home/home.view.html"
            })
            .when("/tutorhome", {
                controller: "TutorHomeController",
                templateUrl: "views/home/tutor.home.view.html"
            })
            .when("/studenthome", {
                controller: "StudentHomeController",
                templateUrl: "views/home/student.home.view.html"
            })
            .when("/forms", {
                controller: "FormController",
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/login", {
                controller: 'LoginController',
                templateUrl: "views/login/login.view.html"

            })
            .when("/register", {
                controller: 'RegisterController',
                templateUrl: "views/register/register.view.html"
            })
            .when("/profile", {
                controller: "ProfileController",
                templateUrl: "views/profile/profile.view.html"
            })
            .when("/admin", {
                controller: "AdminController",
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/reservation", {
                controller: "ReservationController",
                templateUrl: "views/reservation/reservation.view.html"
            })
            .when("/students/:uid/history", {
                controller: "StudentHistoryController",
                templateUrl: "views/history/student.history.view.html"
            })
            .when("/tutors/:uid/history", {
                controller: "TutorHistoryController",
                templateUrl: "views/history/tutor.history.view.html"
            })
            .when("/students/:uid/:field/:time/:location/:duration", {
                controller: "SelectionController",
                templateUrl: "views/selection/selection.view.html"
            })
            .when("/confirm/:sid/:tid/:field/:time/:location/:duration", {
                controller: "ConfirmationController",
                templateUrl: "views/confirmation/confirmation.view.html"
            })
            .when("/feedback", {
                controller: "FeedbackController",
                templateUrl: "views/feedback/feedback.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();