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
// const MONGODB_URI = process.env.MONGODB_URI || "monogdb://localhost/mongoHeadlines";
// mongoose.connect((MONGODB_URI), { useNewURLParser: true });
// mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

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

            if (typeof currURL !== "undefined") {
                if (currURL.startsWith("/news")) {

                    result.title = $(this)
                        .children("a")
                        .text()
                        .trim();

                    result.link = beginURL + currURL;

                    // console.log(result);
                };
            };
            db.Article.create(result) //create a record in the database using the result object just made above
                .then(dbArticle => {
                    console.log(dbArticle);
                })
                .catch(err => {
                    console.log(err);
                })
        });

        res.send("Scraping is complete.")
    });
});

// Route to retrieve all articles from database
app.get("/articles", (req, res) => {
    db.Article.find({}) // calls the article model to get all articles
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});

//Route to retrieve an article by id
app.get("/articles/:id", (req, res) => {
    let id = String(req.params.id);
    // console.log(`The id for the article is ${id}`);
    db.Article.findById(id)
    .populate("note")
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        console.log(err);
    });

});

// Route to save or update note associated with article
app.post("/articles/:id", (req, res) => {
    let id = String(req.params.id);
    db.Note.create(req.body) //create note for article using model
        .then(dbNote => {
            return db.Article.findById({
                id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        })
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        })
});

app.listen(PORT, function () {
    console.log(`The server is running on port ${PORT}!`)
});