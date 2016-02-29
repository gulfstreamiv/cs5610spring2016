"use strict";

module.exports = function(app, model) {
    app.post('/api/assignment/user', function(req, res){
        res.json(model.Create(req.body));
    });

    app.get('/api/assignment/user', function(req, res){
        console.log("Receive GET request!");

        var username = req.query.username;
        var password = req.query.password;

        if(username == null && password == null){
            res.json(model.FindAll());
        }
        else if(password == null){
            res.json(model.findUserByUsername(username));
        }
        else{
            res.json(model.findUserByCredentials(username, password));
        }
    });

    app.get('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        res.json(model.FindById(userId));
    });

    app.put('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        res.json(model.Update(userId, req.body));
    });

    app.delete('/api/assignment/user/:id', function(req, res){
        var userId = req.params.id;
        res.json(model.Delete(userId));
    })

};