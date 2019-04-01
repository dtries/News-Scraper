const db = require("../models");

module.exports = function (app) {
    //Load index page
    app.get("/", (req, res) => {
        res.render("index"); // load the home page
    });

    app.get("*", (req, res) => {
        res.render("404"); //load 404 on get error
    });

};