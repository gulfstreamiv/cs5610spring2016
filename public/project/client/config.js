(function(){
    "use strict";
    angular
        .module("TutorApp")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider
            .when("/home", {
                controller: "HomeController",
                templateUrl: "views/home/home.view.html"
            })
            .when("/adminhome", {
                controller: "AdminHomeController",
                templateUrl: "views/home/admin.home.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/tutorhome", {
                controller: "TutorHomeController",
                templateUrl: "views/home/tutor.home.view.html",
                resolve: {
                    loggedin: checkTutor
                }
            })
            .when("/studenthome", {
                controller: "StudentHomeController",
                templateUrl: "views/home/student.home.view.html",
                resolve: {
                    loggedin: checkStudent
                }
            })
            //.when("/forms", {
            //    controller: "FormController",
            //    templateUrl: "views/forms/forms.view.html"
            //})
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
                templateUrl: "views/profile/profile.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/usermgmt", {
                controller: "UserMgmtController",
                templateUrl: "views/admin/admin.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/admin/feedbackmgmt", {
                controller: "FeedbackMgmtController",
                templateUrl: "views/admin/userFeedback.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/admin/reservationmgmt", {
                controller: "ReservationMgmtController",
                templateUrl: "views/admin/reservationMgmt.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/reservation", {
                controller: "ReservationController",
                templateUrl: "views/reservation/reservation.view.html",
                resolve: {
                    loggedin: checkStudent
                }
            })
            .when("/students/:uid/history", {
                controller: "StudentHistoryController",
                templateUrl: "views/history/student.history.view.html",
                resolve: {
                    loggedin: checkStudent
                }
            })
            .when("/tutors/:uid/history", {
                controller: "TutorHistoryController",
                templateUrl: "views/history/tutor.history.view.html",
                resolve: {
                    loggedin: checkTutor
                }
            })
            .when("/students/:uid/:field/:time/:location/:duration", {
                controller: "SelectionController",
                templateUrl: "views/selection/selection.view.html",
                resolve: {
                    loggedin: checkStudent
                }
            })
            .when("/confirm/:sid/:tid/:field/:time/:location/:duration", {
                controller: "ConfirmationController",
                templateUrl: "views/confirmation/confirmation.view.html",
                resolve: {
                    loggedin: checkStudent
                }
            })
            .when("/feedback", {
                controller: "FeedbackController",
                templateUrl: "views/feedback/feedback.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        console.log("checking admin identity");
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log("user: " + user);
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkStudent = function($q, $timeout, $http, $location, $rootScope)
    {
        console.log("checking admin identity");
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log("user: " + user);
            if (user !== '0' && user.roles.indexOf('student') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkTutor = function($q, $timeout, $http, $location, $rootScope)
    {
        console.log("checking admin identity");
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log("user: " + user);
            if (user !== '0' && user.roles.indexOf('tutor') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            console.log("logged status is " + user);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();