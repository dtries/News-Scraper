// Required npm packages for server, console info, and database
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Required npm packages for scraping
const axios = require("axios");
const cheerio = require("cheerio");

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

// Connect to the Mongo DB, use deployed database unless running on local server, then use local database
const MONGODB_URI = process.env.MONGODB_URI || "monogdb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);

// ======= ROUTES ========

// GET route for scaping the London Times website, grabs from external site at specified http address 
app.get("/scrape", function (req, res) {
    // axios is used to get the body portion of the html for the website
    axios.get("https://www.sciencemag.org/").then(response => {

        let $ = cheerio.load(response.data)

        $("article h2").each(function (i, element, err) {
                let result = {};
                const beginURL = "https://www.sciencemag.org";

                let currURL = $(this)
                    .children("a")
                    .attr("href");

                console.log(`The current url is ${currURL}`);
                if(typeof currURL !== "undefined") {
                if (currURL.startsWith("/news")) {

                    result.title = $(this)
                        .children("a")
                        .text()
                        .trim();

                    result.link = beginURL + currURL;

                    console.log(result);
                };
            };

            });

        res.send("Scraping is complete.")
    });
});

app.listen(PORT, function () {
    console.log(`The server is running on port ${PORT}!`)
});