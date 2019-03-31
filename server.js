// Required npm packages for server, console info, and database
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// Required npm packages for scraping
// const axios = require("axios");
// const cheerio = require("cheerio");

//Required models for mongoDB
const db = require("./models");

// Port assignment for local host server
const PORT = 3000;

//Initialize Express & setup middleware
const app = express();

app.use(logger("dev")); //provides logging to terminal during development
app.use(express.urlencoded({
    extended: true
})); //recognizes incoming request object as strings or arrays
app.use(express.json()); //recognized incoming request object as a JSON object
app.use(express.static("public")); //Set index file in public folder as the home (aka main) page

//Using express handlebars for viewing
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );

  // ======= ROUTES ========
  app.set("view engine", "handlebars");
    require("./routes/apiRoutes")(app);
    require("./routes/htmlRoutes")(app);

// Connect to the Mongo DB, use deployed database unless running on local server, then use local database
// const MONGODB_URI = process.env.MONGODB_URI || "monogdb://localhost/mongoHeadlines";
// mongoose.connect((MONGODB_URI), { useNewURLParser: true });
// mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});


app.listen(PORT, function () {
    console.log(`The server is running on port ${PORT}!`)
});