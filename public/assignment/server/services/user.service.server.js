"use strict";
var LocalStrategy    = require('passport-local').Strategy;
var passport         = require('passport');

module.exports = function(app, model) {
    //var userModel = require("../../models/user/user.model.server.js")();

    var auth = authenticated;

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       register);
    app.get   ('/api/assignment/loggedin',       loggedin);

    app.post('/api/assignment/admin/user', auth, function(req, res){
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

    app.post('/api/assignment/user', auth, function(req, res){
        model.Create(req.body).then(function(retVal){
            res.json(retVal);
        });
    });

    app.get('/api/assignment/user', auth, function(req, res){
        //console.log("Receive GET request!");

        var username = req.query.username;
        var password = req.query.password;

        if(username == null && password == null){
            model.FindAll().then(function(retVal) {
                res.json(retVal);
                console.log(retVal);
            });
        }
        else if(password == null){
            model.findUserByUsername(username).then(function(retVal) {
                res.json(retVal);
                console.log(retVal);
            });
        }
        else{
            model.findUserByCredentials(username, password).then(function(retVal) {
                res.json(retVal);
                console.log(retVal);
            });
        }
    });

    app.get('/api/assignment/admin/user', auth, function(req, res){
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

    app.get('/api/assignment/user/:id', auth, function(req, res){
        var userId = req.params.id;
        model.FindById(userId).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.get('/api/assignment/admin/user/:id', auth, function(req, res){
        if(isAdmin(req.user)) {
            var userId = req.params.id;
            model.FindById(userId).then(function (retVal) {
                res.json(retVal);
            });
        } else {
            res.status(403);
        }
    });

    app.put('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        var newUser = req.body;
        //normal user can't update roles
        delete newUser.roles;
        model.Update(userId, req.body).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.put('/api/assignment/admin/user/:id', auth, function(req, res){
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

    app.delete('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        model.Delete(userId).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.delete('/api/assignment/admin/user/:id', auth, function(req, res){
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

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
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

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .FindById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

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