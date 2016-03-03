"use strict";

module.exports = function(app, model){
    app.get('/api/assignment/user/:userId/form', function(req, res){
        var userId = req.params.userId;
        res.json(model.findFormByUserId(userId));
    });

    app.get('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        res.json(model.FindById(formId));
    });

    app.delete('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        res.json(model.Delete(formId));
    });

    app.post('/api/assignment/user/:userId/form', function(req, res){
        var userId = req.params.userId;
        req.body.userId = userId;
        res.json(model.Create(req.body));
    });

    app.put('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        res.json(model.Update(formId, req.body));
    })
};