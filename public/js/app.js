$(document).ready(function () {

    $(function () {
        $("body").removeClass("fade-out");
    });


    $(".sidenav").sidenav({
        closeOnClick: true,
        inDuration: 500,
        outDuration: 500,
        draggable: false
    });

    $(".modal").modal({
        dismissable: false,
        opacity: 0.5,
        inDuration: 1500, // in ms
        outDuration: 1750, // in ms
        startingTop: "10%",
        startingBottom: "16%"
    });


    //retrieve articles in json format from database
    // var retrieveData = function () {
    $.getJSON("/articles", data => {
        for (let i = 0; i < data.length; i++) {
            $("#articles").append(
                `<div class="col s12">
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src=${data[i].photoURL} class="responsive-img">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <span data-id = ${data[i]._id} id="card-article-title">${data[i].title}</span>
                                <p data-id = ${data[i]._id} id="card-article-author">By ${data[i].author} | Date ${data[i].date}</p>
                            </div>
                            <div class="card-action">
                                <a class="left" id="story-link" href=${data[i].link}>Link to Story</a>
                                <a class="right" id="article-remove">Remove Article</a>
                                <a class="right" href="#notes" class="modal-trigger" id="note-add" data-id = ${data[i]._id}>Add Note</a>
                                
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


    // Whenever someone clicks the add note link
    $(document).on("click", "#note-add", function () {
        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the #note-add link data-id
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // Now add the note information to the page at id notes
            .then(function (data) {
                $("#notes").append(
                    `<div class="modal-content>
                        <h4 id="title-modal">Note for: ${data.title}</h4>

                        <div class="divider"></div>

                        <input placeholder="Enter a Title for Your Note" id="titleinput" name="title" class="flow-text">

                        <textarea placeholder="Enter Your Note Here" id="bodyinput" class="materialize-textarea flow-text" name="body"></textarea>

                        <div class="modal-footer">
                        <button data-id=${data._id} id="savenote" class="waves-effect waves-light btn">Save Note</button>
                        </div>
                   `
                );

                //article info

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                }

                // display modal
                $("#notes").modal("open");
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

        // Close the modal
        $("#notes").modal("close");
    });

});