"use strict";

module.exports = function(app, model) {


    app.post('/api/assignment/user', function(req, res){
        model.Create(req.body).then(function(retVal){
            res.json(retVal);
        });
    });

    app.get('/api/assignment/user', function(req, res){
        console.log("Receive GET request!");

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

    app.get('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        model.FindById(userId).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.put('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        model.Update(userId, req.body).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.delete('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        model.Delete(userId).then(function(retVal) {
            res.json(retVal);
        });
    })

};