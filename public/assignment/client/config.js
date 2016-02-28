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
            .when("/forms", {
                controller: "FormController",
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/user/:userId/form/:formId/fields", {
                controller: "FieldController",
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
                templateUrl: "views/profile/profile.view.html"
            })
            .when("/admin", {
                controller: "AdminController",
                templateUrl: "views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();