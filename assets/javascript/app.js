// *** BUTTONS ON TOP
// --------------------------------------
// 1. There are several default buttons already loaded at the top of the page when the page first loads

// Variable array for all the food items
var allFood = ['pizza', 'taco', 'burger', 'cookies', 'pie', 'cake', 'ramen', 'burrito', 'soda', 'chocolate'];

// Function for displaying food buttons
function renderButtons() {
    // Ensures that the food buttons are deleted before creating new ones, this avoids repeat buttons
    $('#buttonBox').empty();
    // A for loop that goes through the food array
    for (var i = 0; i < allFood.length; i++) {
        // Dynamically generates buttons for each food in the array
        var a = $('<button class="btn btn-light btn-sm">');
        // Adds a class to all the food buttons
        a.addClass('food');
        // Adds data attribute with value of food at index i
        a.attr('data-type', allFood[i]);
        // Adds the button's text with value of food at index i
        a.text(allFood[i]);
        // Appends the button to the HTML
        $('#buttonBox').append(a);
    }
}

// *** SEARCH AND ADD BUTTON
// --------------------------------------

// 1. There's a search text box with a submit button
// 2. A user can type input text and a new button will be generated to the default buttons on top

// A function that handles an event on click
$('#add-food').on('click', function (event) {
    // Prevents the form from submitting itself
    event.preventDefault();
    // Variable that grabs the user input from search box
    var newFood = $('#food-input').val().trim();
    // New food is added to the allFood array
    allFood.push(newFood);
    // Calls the renderButtons function that processes the food array
    renderButtons();
});

// Calls the renderButtons function the first time
renderButtons();

// *** GIFS DISPLAYED
// --------------------------------------

// 1. No gifs are displayed yet
// 2. When a user clicks on any of the buttons displayed above
// 3. A dump of 10 gifs and their ratings will be dumped based on the button's value
// 4. When a user clicks on the gif, it will start to animate and if clicked again it will pause
// 5. When a user clicks on another button, it will clear the previous dump of gifs and load a new one

// Click event listener for when all buttons are clicked
$(document).on('click', '.food', function () {
    // Grabs and stores the data from the button's 'data-food' value
    var food = $(this).data('type');
    console.log(food);
    // Builds the queryURL using the food name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Performs the AJAX request with queryURL
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        // After the data comes back from AJAX request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            // Stores the data from AJAX request into variable
            var results = response.data;

            // For loop to go through results of AJAX request
            for (var i = 0; i < results.length; i++) {
                // Creates a div for our food gifs
                var foodDiv = $('<div class="search-item">');
                // Creates a paragraph tag with ratings from result
                var p = $('<p>').text('Rating: ' + results[i].rating);
                // Variable to search through response data for animated gif url
                var animated = results[i].images.fixed_height.url;
                // Variable to search through response data for animated gif url
                var still = results[i].images.fixed_height_still.url;
                // Variable to create an image tag
                var foodImage = $('<img>');
                // Variable to add a class to the gif
                foodImage.addClass('foodGif');
                // Setting gif image to pick the still url
                foodImage.attr('src', still);
                foodImage.attr('data-still', still);
                // Setting gif image to select the animated url
                foodImage.attr('data-animated', animated);
                // Setting the data state to still
                foodImage.attr('data-state', 'still');
                // Appends the gif to the div in the HTML page
                foodDiv.append(p);
                foodDiv.append(foodImage);
                // Prepends the new gif div into our main gif box on the HTML page
                $('#gifBox').prepend(foodDiv);
            }
        })
})

// Click event listener that runs when any gif is clicked
$(document).on('click', '.foodGif', function(){
    // Variable to define the state of the gif that is clicked
    var state = $(this).data('state');
    // If the state of the gif is set to still
    if(state == 'still'){
        // Set its src and data state attribute to animated
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
        // Else set its src and data state attribute to still
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
})

