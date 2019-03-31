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

            $("article h2").each(function (i, element) {
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
                    articleToDb(result);
                    };
                };
                function articleToDb(result) {db.Article.create(result) //create a record in the database using the result object just made above
                    .then(dbArticle => {
                        console.log(dbArticle);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                };
            });

            // $("article").each(function (i, element) {
            //     let resultImg = {};

            //     console.log("Made IT HERE HERE HERE")

            //     resultImg.image = $(this)
            //         .children("img")
            //         .attr("src");
            //         console.log(`The image is at ${resultImg}`);

            //     db.Article.create(resultImg) //create a record in the database using the result object just made above
            //         .then(dbArticle => {
            //             console.log(dbArticle);
            //         })
            //         .catch(err => {
            //             console.log(err);
            //         })
            // });

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
};