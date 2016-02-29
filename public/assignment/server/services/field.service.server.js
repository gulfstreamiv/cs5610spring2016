"use strict";

module.exports = function(app, model){
    app.get('/api/assignment/form/:formId/field', function(req, res){
        var formId = req.params.formId;
        res.json(model.findFieldByFormId(formId));
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.findFieldByFieldIdFormId(fieldId, formId));
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.deleteByFieldIdFormId(fieldId, formId));
    });

    app.post('/api/assignment/form/:formId/field', function(req, res){
        var formId = req.params.formId;
        res.json(model.CreateField(formId, req.body));
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.updateByFieldIdFormId(fieldId, formId, req.body));
    })
};