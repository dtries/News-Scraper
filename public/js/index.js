//retrieve articles in json format from database
$.getJSON("/articles", data => {
    for (let i = 0; i  <data.length ; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});