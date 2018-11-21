$(document).ready(() => {


    const curb = [
        "Larry", "Jeff", "Cheryl", "Susie", "Richard",
        "J.B.Smoove"
    ];

// function to make buttons and add to page
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (let i = 0; i < arrayToUse.length; i++) {
        let a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    };
};

$(document).on("click", ".curb-buttons", () => {
    $("#curbed").empty();
    $("#curb-button").removeClass("active");
    $(this).addClass("active");

    let type = $(this).attr("data-type");
    let queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=STlL3CcOnyZ0Zu4fPQ8TYxxEHETImz5y=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })

        .then(response(() => {
            let results = response.data;

            for (let i = 0; i < results.length; i++) {
                let curbDiv = $("<div class=\"animal-item\">");

                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height_still.url;

                let curbImage = $("<img>");
                curbImage.attr("src", still);
                curbImage.attr("data-still", still);
                curbImage.attr("data-animate", animated);
                curbImage.addClass("curb-image");

                curbDiv.append(p);
                curbDiv.append(animalImage);

                $('#curb').append(curbDiv);
            }
        }));
});

$(document).on('click', 'curb-image', () =>{
    let state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});

$('#add-curb').on('click', (event) =>{
    event.preventDefault();
    const newCurb = $('input').eq(0).val();

    if (newCurb.length > 2) {
        curb.push(newCurb);
    }

    populateButtons(curb, 'curb-button', '#curb-buttons');
});

populateButtons(curb, 'curb-button', '#curb-buttons');
});