$(document).ready(function () {

    $(function () {
        $("body").removeClass("fade-out");
    });


    $(".sidenav").sidenav({
        closeOnClick: true,
        inDuration: 500,
        outDuration: 500,
    });


    // $('.sidenav').sidenav(); //side nav menu materialize for responsiveness
    //retrieve articles in json format from database
    // var retrieveData = function () {
    $.getJSON("/articles", data => {
        for (let i = 0; i < data.length; i++) {
            $("#articles").append(
                `<div class="col s12">
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src=${data[i].photoURL}>
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <p data-id = ${data[i]._id}>${data[i].title}<br><br>By ${data[i].author} | Date ${data[i].date}</p>
                            </div>
                            <div class="card-action">
                                <a class="left" href=${data[i].link}>Link to Story</a>
                                <a class="right">Remove Article</a>
                                <a class="add-note right">Add Note </a>
                                
                        </div>
                        </div>
                    </div>
                </div>`
            );
        };
    });
    // };

    $("#new-scrape").click(() => {
        $.get("/scrape");
        // .then()
        // retrieveData();
    });


    // retrieveData();


    // Whenever someone clicks a p tag
    $(document).on("click", ".add-note", function () {
        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the p tag
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                // The title of the article
                $("#notes").append("<h2>" + data.title + "</h2>");
                // An input to enter a new title
                $("#notes").append("<input id='titleinput' name='title' >");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                }
            });
    });

    // When you click the savenote button
    $(document).on("click", "#savenote", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value taken from title input
                    title: $("#titleinput").val(),
                    // Value taken from note textarea
                    body: $("#bodyinput").val()
                }
            })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes").empty();
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

});