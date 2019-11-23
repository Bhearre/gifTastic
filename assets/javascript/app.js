var animals = ["Cats", "Dogs", "Hamsters", "Ferrets"];

// Function for displaying animal data
function renderButtons() {

    // Deleting the animals buttons prior to adding new animal buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("animal");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", animals[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(animals[i]);
        a.on("click", loadGifs);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}
renderButtons();


// This .on("click") function will trigger the AJAX Call
$("#add-animal").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var animal = $("#animal-input").val().trim();
    if(animal === ""){
        return;
    }
    else {
    animals.push(animal);
    console.log(animals);
    renderButtons();
    $("#animal-input").val("");
};
});

function loadGifs(event) {
    var animal = $(this).attr("data-name");
    console.log(animal);
    // encodeURI translates spaces in user input into readable string
    var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=iJpeCQHCcdk058xQ6eV06LW74SSChwfp&q=" + encodeURI(animal) + "&limit=10&rating=G&lang=en";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        $("#animals-view").empty();

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            // animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalDiv.addClass("float-md-left")
            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#animals-view").prepend(animalDiv);
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


