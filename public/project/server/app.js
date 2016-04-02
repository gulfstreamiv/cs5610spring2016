"use strict";

module.exports = function(app, mongoose, db) {
    var reservationModel = require("./models/reservation.model.js")(app, mongoose, db);
    var userModel = require("./models/user.model.js")(app, mongoose, db);
    require("./services/reservation.service.server.js")(app, reservationModel);
    require("./services/user.service.server.js")(app, userModel);
};