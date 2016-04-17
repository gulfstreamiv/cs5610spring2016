"use strict";

module.exports = function(app, model) {

    app.get('/api/project/admin/reservation', function(req, res){
        model.FindAll().then(function(retVal){
            res.json(retVal);
        });
    });

    app.post('/api/project/reservation', function(req, res){
        console.log("RESERVATION CREATE request!! Server side!");
        model.Create(req.body).then(function(retVal){
            res.json(retVal);
        });
    });

    app.get('/api/project/reservation/:id', function(req, res){
        var rid = req.params.id;
        model.FindById(rid).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.get('/api/project/reservation/student/:id', function(req, res){
        var sid = req.params.id;
        console.log("Student hisotry request!! Server side!" + "sid = " + sid);
        model.FindByStudentId(sid).then(function(retVal) {
            console.log("reservation.service.server return with reservation list " + retVal);
            res.json(retVal);
        });
    });

    app.get('/api/project/reservation/tutor/:id', function(req, res){
        var tid = req.params.id;
        model.FindByTutorId(tid).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.put('/api/project/reservation/:id', function(req, res){
        console.log("reservation service server received PUT request");
        var reservation = req.params.id;
        model.Update(reservation, req.body).then(function(retVal) {
            res.json(retVal);
        });
    });

    app.delete('/api/project/reservation/:id', function(req, res){
        var rid = req.params.id;
        model.Delete(rid).then(function(retVal) {
            res.json(retVal);
        });
    })

};