(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider
            .when("/home", {
                controller: "HomeController",
                templateUrl: "views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/forms", {
                controller: "FormController",
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/user/:userId/form/:formId/fields", {
                controller: "FieldController",
                controllerAs: "model",
                templateUrl: "views/forms/field.view.html"
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
                templateUrl: "views/profile/profile.view.html",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                controller: "AdminController",
                templateUrl: "views/admin/admin.view.html",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
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

        $http.get('/api/assignment/loggedin').success(function(user)
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

        $http.get('/api/assignment/loggedin').success(function(user)
        {
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