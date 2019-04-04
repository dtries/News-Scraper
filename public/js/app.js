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
        dismissable: true,
        opacity: 0.5,
        inDuration: 750, // in ms
        outDuration: 1000, // in ms
        startingTop: "10%",
        startingBottom: "16%"
    });


    //retrieve articles in json format from database
    var retrieveData = function () {
        $("#articles").empty();
        $.getJSON("/articles", data => {
            for (let i = 0; i < data.length; i++) {
                $("#articles").append(
                    `<div class="col s12" id="card-col-div">
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src=${data[i].photoURL} class="responsive-img">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <p data-id=${data[i]._id} id="card-article-title">${data[i].title}</p>
                                <p data-id=${data[i]._id} id="card-article-author">By ${data[i].author} | Date ${data[i].date}</p>
                            </div>
                            <div class="card-action">
                                <a class="left" id="story-link" href=${data[i].link}>Link to Story</a>

                                <a class="right" id="article-remove" data-id=${data[i]._id}>Remove Article</a>

                                <a class="right" href="#notes" class="modal-trigger" id="note-add" data-id=${data[i]._id}>Add Note</a>
                                
                        </div>
                        </div>
                    </div>
                </div>`
                );
            };
        });
    };



    $("#new-scrape").click(function(){
        $.get("/scrape");
        timedRetrieveDelay();   
    });

    function timedRetrieveDelay() {
        setTimeout(getTheData, 2000);
    };

    function getTheData() {
        retrieveData();
    }

    retrieveData();

    $("#clear-articles").click(() => {
        $("#articles").empty();
    });

    // Whenever someone clicks the add note link
    $(document).on("click", "#note-add", function () {
        // event.preventDefault();
        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the #note-add link data-id
        var thisId = $(this).attr("data-id");
        console.log(`The id YOW is ${thisId}`);

        // Now make an ajax call for the Article
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // Now add the note information to the page at id notes
            .then(function (data) {
                $("#notes").append(
                    `<div class="modal-content>
                        <h4 id="title-modal">Note for: ${data.title}<a id="exit-note" href="/"><i class="right material-icons" id="exit-symbol" >close</i></a></h4>


                        <div class="divider"></div>

                        <input placeholder="Enter a Title for Your Note" id="titleinput" name="title" class="flow-text">

                        <textarea placeholder="Enter Your Note Here" id="bodyinput" class="materialize-textarea flow-text" name="body"></textarea>

                        <div class="modal-footer">
                            <button data-id=${data._id} id="delete-note" href="/" class="left waves-effect waves-light btn">Delete Note</button>
                            
                            <button data-id=${data._id} id="save-note" href="/" class="waves-effect waves-light btn">Save Note</button>
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

                   $("#delete-note").attr("note-id", data.note._id);
                    
                   var noteID = $("#delete-note").attr("note-id");
                    console.log(`The note id is ${(noteID)}`);
                }

                // display modal
                $("#notes").modal("open");
            });
    });

    // When you click the save-note button
    $(document).on("click", "#save-note", function () {
        event.preventDefault();
        // Grab the id associated with the article from the button
        var thisId = $(this).attr("data-id");

        // Run a PUT request to change the note, using what's entered in the inputs
        $.ajax({
                method: "PUT",
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

    $(document).on("click", "#exit-note", () => {
        event.preventDefault();
        $("#notes").modal("close");
    });

    $(document).on("click", "#delete-note", function () {
        // event.preventDefault();
        // Grab the id associated with the note from the button
        var thisId = $(this).attr("note-id");
        console.log(`The note id is ${thisId}`);

        // Run a DELETE request to delete the note
        $.ajax({
                method: "DELETE",
                url: "/notes/" + thisId,
                data: { id: thisId },
                success: function(data) {
                    console.log("Success");

                },
                error: () => {
                    console.log("error");
                }
            });
        // Close the modal
        $("#notes").modal("close");
    });


    

    $(document).on("click", "#article-remove", function () {
        // event.preventDefault();
        // Grab the id associated with the article from the button
        var thisId = $(this).attr("data-id");
        console.log(`The article id is ${thisId}`);
        $("#card-col-div").remove();

        // Run a DELETE request to delete the article
        $.ajax({
                method: "DELETE",
                url: "/articles/" + thisId,
                data: { id: thisId },
                success: function(data) {
                    console.log("Success");

                },
                error: () => {
                    console.log("error");
                }
            });
     });

});