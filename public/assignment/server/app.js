"use strict";

module.exports = function(app) {
    var formModel = require("./models/form.model.js")(app);
    var userModel = require("./models/user.model.js")(app);
    require("./services/field.service.server.js")(app, formModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/user.service.server.js")(app, userModel);
};