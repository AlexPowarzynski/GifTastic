var gifButtons = ["Cats", "Dogs", "Fox", "Kittens"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifs() {

    var gifButton = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifButton + "&api_key=49pp7hetxFhA8S9ChBPSLa0laEpwDmoH&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++){
        var rating = response.data[i].rating;
        var imgURL = response.data[i].images.original.url;

        // Creating a div to hold the movie
        var gifDiv = $("<div>").append(
            $("<div>").text(rating),
            $("<img>").attr('src', imgURL)
        );

        // Storing the rating data

        $("#gifDump").prepend(gifDiv);
    }
});

}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifButtons.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("gif-btn");
        // Adding a data-attribute
        a.attr("data-name", gifButtons[i]);
        // Providing the initial button text
        a.text(gifButtons[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gifButton = $("#gif-input").val();

    // Adding movie from the textbox to our array
    gifButtons.push(gifButton);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gif-btn", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();