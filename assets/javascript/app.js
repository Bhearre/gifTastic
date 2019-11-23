var cartoons = ["Elmer Fudd", "Tweety Bird", "Foghorn Leghorn", "Road Runner", "Wile E. Coyote", "Daffy Duck", "Marvin the Martian", "Pinky and the Brain", "Fred Flintstone", "George Jetson", "Tasmanian Devil"];

// Function for displaying cartoon data
function renderButtons() {

    // Deleting the cartoons buttons prior to adding new cartoon buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of cartoons
    for (var i = 0; i < cartoons.length; i++) {

        // Then dynamicaly generating buttons for each cartoon in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("cartoon");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", cartoons[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(cartoons[i]);
        a.on("click", loadGifs);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}
renderButtons();


// This .on("click") function will trigger the AJAX Call
$("#add-cartoon").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var cartoon = $("#cartoon-input").val().trim();
    if(cartoon === ""){
        return;
    }
    else {
    cartoons.push(cartoon);
    console.log(cartoons);
    renderButtons();
    $("#cartoon-input").val("");
};
});

function loadGifs(event) {
    var cartoon = $(this).attr("data-name");
    console.log(cartoon);
    // encodeURI translates spaces in user input into readable string
    var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=iJpeCQHCcdk058xQ6eV06LW74SSChwfp&q=" + encodeURI(cartoon) + "&limit=10&rating=G&lang=en";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        $("#cartoons-view").empty();

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var cartoonDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var cartoonImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            // cartoonImage.attr("src", results[i].images.fixed_height.url);
            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            cartoonDiv.addClass("float-md-left")
            // Appending the paragraph and image tag to the cartoonDiv
            cartoonDiv.append(cartoonImage);
            cartoonDiv.append(p);
            
            // Prependng the cartoonDiv to the HTML page in the "#gifs-appear-here" div
            $("#cartoons-view").prepend(cartoonDiv);
        }

        console.log(response.data);

    });
};

// on click function for playing/stopping gif 
$("body").on("click", "img", function () {
    var src = $(this).attr("src");
    if ($(this).hasClass("animate")) {
        //stop
        $(this).attr("src", src.replace(".gif", "_s.gif"));
        $(this).removeClass("animate");
    } else {
        //play
        $(this).addClass("animate");
        $(this).attr("src", src.replace("_s.gif", ".gif"));
    };
});


