$(document).ready(function(){

// $('.sidenav').sidenav(); //side nav menu materialize for responsiveness
//retrieve articles in json format from database
$.getJSON("/articles", data => {
    for (let i = 0; i < data.length; i++) {
        $("#articles").append(           
            `<div class="col s12">
                <div class="card horizontal">
                    <div class="card-image">
                        <img src="/images/relativity_eq.jpeg"">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <p data-id = ${data[i]._id}>${data[i].title}<br><br>By Author | Date</p>
                        </div>
                        <div class="card-action">
                            <a ${data[i].link}>Link to Story</a>
                        </div>
                    </div>
                </div>
            </div>`
        );
    };
});

});
