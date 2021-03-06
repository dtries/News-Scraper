const mongoose = require("mongoose"); 

// Make schema constructor reference constant
const Schema = mongoose.Schema; 

//Use schema to put together information object for scarped articles
let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    photoURL: {
        type: String,
    },
    note: {
        type:Schema.Types.ObjectId, //sets the ID shown for note to that assigned by the Note constructor
        ref: "Note" //references where to look for the ObjectId for type immediately above
    }
});

//Create database model using the schema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article; 
