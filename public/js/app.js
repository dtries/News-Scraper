$(document).ready(function(){



// $('.sidenav').sidenav(); //side nav menu materialize for responsiveness
//retrieve articles in json format from database
    var retrieveData = function() { $.getJSON("/articles", data => {
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
                                <a ${data[i].link}>Link to Story</a>
                                <a class="right">Remove Article</a>
                                <a class="right">Add Note &nbsp &nbsp</a>
                                
                        </div>
                        </div>
                    </div>
                </div>`
            );
        };
    });
    };

    $("#new-scrape").click( () => {
        $.get("/scrape").then()
        retrieveData();
    });


    retrieveData();
    
});




// ======== Event Listeners =========

