const db = require("../models");

// Required npm packages for scraping
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {

    // GET route for scaping the London Times website, grabs from external site at specified http address 
    app.get("/scrape", function (req, res) {
        // axios is used to get the body portion of the html for the website
        axios.get("https://www.sciencemag.org/").then(function(response) {

            let $ = cheerio.load(response.data)

            $("article").each(function (i, element) {
                let result = {};
;
                const beginURL = "https://www.sciencemag.org";

                let currURL = $(this)
                    .children()
                    .children("a")
                    .attr("href");
                let authByline = $(this).find(".byline");
                console.log(`The author byline exists: ${authByline}`);
                if (typeof currURL !== "undefined") {
                    if (currURL.startsWith("/news")) {
                        result.title = $(this)
                            .find("h2")
                            .find("a")
                            .text()
                            .trim();

                        if (authByline=true) {
                        result.author = $(this)
                            .find(".byline")
                            .children("a")
                            .text()
                            .trim();
                        };

                        result.date = $(this)
                            .find(".byline")
                            .find("time")
                            .text()
                            .trim();

                        result.photoURL = $(this)
                            .find("img")
                            .attr("src");
                        

                        result.link = beginURL + currURL;
                    // console.log(result.author);

                    articleToDb(result);
                   
                    };
                };
                function articleToDb(result) {db.Article.create(result) //create a record in the database using the result object just made above
                    .then(dbArticle => {
                        // console.log(result.author);
                        console.log(dbArticle);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                };
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

        // Route to retrieve all articles from database
        app.get("/notes", (req, res) => {
            db.Note.find({}) // calls the article model to get all articles
                .then(dbNote => {
                    res.json(dbNote);
                })
                .catch(err => {
                    res.json(err);
                });
        });

    //Route to retrieve an article by id populate with a note
    app.get("/articles/:id", (req, res) => {
        // let id = String(req.params.id);
        // console.log(`The id for the article is ${id}`);
        db.Article.findOne({_id: req.params.id})
            .populate("note")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(err => {
                res.json(err);
            });

    });

    // Route to save or update note associated with article
    app.post("/articles/:id", (req, res) => {
        // let id = String(req.params.id);
        db.Note.create(req.body) //create note for article using model
            .then(function(dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(dbArticle => {
                res.json(dbArticle);
            })
            .catch(err => {
                res.json(err);
            })
    });
};