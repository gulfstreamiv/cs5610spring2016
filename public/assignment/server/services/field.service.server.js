"use strict";

module.exports = function(app, model){
    app.get('/api/assignment/form/:formId/field', function(req, res){
        var formId = req.params.formId;
        model.findFieldByFormId(formId).then(function(retVal){
            res.json(retVal);
        });
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldByFieldIdFormId(fieldId, formId).then(function(retVal){
            res.json(retVal);
        });
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteByFieldIdFormId(fieldId, formId).then(function(retVal){
            res.json(retVal);
        });
    });

    app.post('/api/assignment/form/:formId/field', function(req, res){
        var formId = req.params.formId;
        model.CreateField(formId, req.body).then(function(retVal){
            res.json(retVal);
        });
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.updateByFieldIdFormId(fieldId, formId, req.body).then(function(retVal){
            res.json(retVal);
        });
    })
};