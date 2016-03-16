"use strict";

module.exports = function(app, model){
    app.get('/api/assignment/user/:userId/form', function(req, res){
        var userId = req.params.userId;
        model.findFormByUserId(userId).then(function(retVal){
            res.json(retVal);
        });
    });

    app.get('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        model.FindById(formId).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.delete('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        model.Delete(formId).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.post('/api/assignment/user/:userId/form', function(req, res){
        var userId = req.params.userId;
        req.body.userId = userId;
        model.Create(req.body).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.put('/api/assignment/form/:formId', function(req, res){
        var formId = req.params.formId;
        model.Update(formId, req.body).then(function(retVal) {
            res.json(retVal);
        });
    })
};