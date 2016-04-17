"use strict";

var LocalStrategy    = require('passport-local').Strategy;
var passport         = require('passport');
//var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, model) {

    //session management
    var auth = authenticated;

    app.post  ('/api/project/login', passport.authenticate('local-project'), login);
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       register);
    app.get   ('/api/project/loggedin',       loggedin);


    //admin functionality
    app.post('/api/project/admin/user', auth, function(req, res){
        if(isAdmin(req.user)) {
            model
                .Create(req.body)
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    });


    app.get('/api/project/admin/user', auth, function(req, res){
        console.log("Receive GET request!");

        var username = req.query.username;
        var password = req.query.password;

        //if(username == null && password == null){
        //    model.FindAll().then(function(retVal) {
        //        res.json(retVal);
        //        console.log(retVal);
        //    });
        //}
        //else if(password == null){
        //    model.findUserByUsername(username).then(function(retVal) {
        //        res.json(retVal);
        //        console.log(retVal);
        //    });
        //}
        //else{
        //    model.findUserByCredentials(username, password).then(function(retVal) {
        //        res.json(retVal);
        //        console.log(retVal);
        //    });
        //}
        if(isAdmin(req.user)) {
            model
                .FindAll()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    });


    app.get('/api/project/admin/user/:id', auth, function(req, res){
        if(isAdmin(req.user)) {
            var userId = req.params.id;
            model.FindById(userId).then(function (retVal) {
                res.json(retVal);
            });
        } else {
            res.status(403);
        }
    });


    app.put('/api/project/admin/user/:id', auth, function(req, res){
        //var userId = req.params.id;
        //model.Update(userId, req.body).then(function(retVal) {
        //    res.json(retVal);
        //});
        var userId = req.params.id;
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        model
            .Update(userId, newUser)
            .then(
                function(user){
                    return model.FindAll();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    });

    app.put('/api/project/admin/feedback/:id', auth, function(req, res){
        //var userId = req.params.id;
        //model.Update(userId, req.body).then(function(retVal) {
        //    res.json(retVal);
        //});
        if(isAdmin(req.user)) {
            var feedbackId = req.params.id;
            var newFeedback = req.body;

            model
                .updateFeedback(feedbackId, newFeedback)
                .then(
                    function (feedback) {
                        return model.FindAll();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (feedbacks) {
                        res.json(feedbacks);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else{
            res.status(403);
        }
    });


    app.delete('/api/project/admin/feedback/:id', auth, function(req, res){
        //var userId = req.params.id;
        //model.Delete(userId).then(function(retVal) {
        //    res.json(retVal);
        //});
        if(isAdmin(req.user)) {
            model
                .deleteFeedback(req.params.id)
                .then(
                    function(user){
                        return model.FindAll();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    });

    app.delete('/api/project/admin/user/:id', auth, function(req, res){
        //var userId = req.params.id;
        //model.Delete(userId).then(function(retVal) {
        //    res.json(retVal);
        //});
        if(isAdmin(req.user)) {
            model
                .Delete(req.params.id)
                .then(
                    function(user){
                        return model.FindAll();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    });


    app.post('/api/project/user', function(req, res){
        model.Create(req.body).then(function(retVal){
            res.json(retVal);
        });
    });

    app.post('/api/project/feedback', function(req, res){
        model.addFeedback(req.body).then(function(retVal){
            res.json(retVal);
        });
    });

    app.get('/api/project/feedback', function(req, res){
        model.getFeedback(req.body).then(function(retVal){
            res.json(retVal);
        });
    });


    app.get('/api/project/user', function(req, res){
        console.log("Receive GET request! ... PROJECT");

        var username = req.query.username;
        var password = req.query.password;

        if(username == null && password == null){
            model.FindAll().then(function(retVal) {
                res.json(retVal);
                console.log(retVal);
            });
        }
        //else if(password == null){
        //    model.findUserByUsername(username).then(function(retVal) {
        //        res.json(retVal);
        //        console.log(retVal);
        //    });
        //}
        else{
            model.findUserByCredentials(username, password).then(function(retVal) {
                res.json(retVal);
                console.log(retVal);
            });
        }
    });

    app.get('/api/project/user/:id', function(req, res){
        var userId = req.params.id;
        model.FindById(userId).then(function(retVal) {
            //console.log("found user:" + retVal.username);
            res.json(retVal);
        });
    });

    app.get('/api/project/tutor/:field/:location', function(req, res){
        console.log("server side find by field location!");
        var location = req.params.location;
        var field = req.params.field;
        console.log("location: " + location + "field: " + field);
        model.FindByLocationField(field, location).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.put('/api/project/user/:id', function(req, res){
        var userId = req.params.id;
        model.Update(userId, req.body).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.delete('/api/project/user/:id', function(req, res){
        var userId = req.params.id;
        model.Delete(userId).then(function(retVal) {
            res.json(retVal);
        });
    });

    passport.use('local-project', new LocalStrategy(localStrategyProject));
    //passport.serializeUser(serializeUserProject);
    //passport.deserializeUser(deserializeUserProject);

    function login(req, res) {
        //console.log("req.user is set as" + req.user);
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        console.log("logging out on project... req.user is " + req.user);
        res.send(200);
    }

    function loggedin(req, res) {
        //if(req.isAuthenticated()) console.log("user is loggedin! " + req.user);
        console.log("req.user is " + req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];
        console.log("registering student on server side... " + newUser.username);
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    console.log("returned user search... " + user);
                    if(user) {
                        res.json(null);
                    } else {
                        return model.Create(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function localStrategyProject(username, password, done) {
        console.log("called Localstrategy project");
        model
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    //console.log("found user on DB " + user);
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    //function serializeUserProject(user, done) {
    //    console.log("called serialize on Project");
    //    delete user.password;
    //    done(null, user);
    //}
    //
    //function deserializeUserProject(user, done) {
    //    console.log("called deserialize on Project");
    //    model
    //        .FindById(user._id)
    //        .then(
    //            function(user){
    //                delete user.password;
    //                done(null, user);
    //            },
    //            function(err){
    //                done(err, null);
    //            }
    //        );
    //}

    function isAdmin(user) {
        if(user.roles.indexOf("admin") != -1) {
            //console.log("user is admin!");
            return true
        }
        //console.log("user is not admin!");
        return false;
    }

    function authenticated (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

};