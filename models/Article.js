const mongoose = require("mongoose"); 

// Make schema constructor reference constant
const Schema = mongoose.Schema; 

//Use schema to put together information object for scarped articles
let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type:Schema.Types.ObjectId, //sets the ID shown for note to that assigned by the Note constructor
        ref: "Note" //references where to look for the ObjectId for type immediately above
    }
});

//Create database model using the schema
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article; 
