var gifButtons = ["Cats", "Dogs", "Fox", "Kittens"];

function displayGifs() {

    var gifButton = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifButton + "&api_key=49pp7hetxFhA8S9ChBPSLa0laEpwDmoH&limit=10";

    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++){
        var rating = response.data[i].rating;
        var imgURL = response.data[i].images.original_still.url;
        var dataStill = response.data[i].images.original_still.url;
        var dataAnimate = response.data[i].images.original.url;

        // Creating a div to hold the gif
        var gifDiv = $("<div>").append(
            $("<div>").text(rating),
            $("<img>").attr('src', imgURL)
            .addClass("gif")
            .attr("data-state", "still")
            .attr("data-still", dataStill)
            .attr("data-animate", dataAnimate)
        );

            console.log(gifDiv);
        $("#gifDump").prepend(gifDiv);
        $("#gifDump").prepend("<br>");
        
    }
});

}

// Function for displaying gif buttons data
function renderButtons() {

    // Deleting the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifButtons.length; i++) {

        // Then dynamicaly generating buttons for each gif button in the array
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
    var gifButton = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    gifButtons.push(gifButton);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

function animate() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifs);
$(document).on("click", ".gif", animate);

// Calling the renderButtons function to display the initial buttons
renderButtons();