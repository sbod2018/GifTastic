$(document).ready(() => {


    const curb = [
        "Larry David", "Jeff Greene", "Cheryl David", "Susie Greene", "Richard Lewis",
        "J.B.Smoove"
    ];

    // function to make buttons and add to page
    function populateButtons() {
        $('#curbed-buttons').empty();

        for (let i = 0; i < curb.length; i++) {
            let a = $("<button>");
            a.addClass("curbed-button");
            a.attr("data-topic", curb[i]);
            a.text(curb[i]);
            $('#curbed-buttons').append(a);
        };
    };

    $(document).on("click", ".curbed-button", function() {
        $("#curbed-gifs").empty();
        // $("#curb-button").removeClass("active");
        // $(this).addClass("active");

        const topic = $(this).attr("data-topic");
        console.log(topic)
        const queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(topic) + "&api_key=STlL3CcOnyZ0Zu4fPQ8TYxxEHETImz5y&limit=5";


        $.ajax({
            url: queryUrl,
            method: "GET"
        })

            .then(function (response) {
                const results = response.data;

                for (let i = 0; i < results.length; i++) {
                    const curbDiv = $('<div class="curbed-item">');

                    const rating = results[i].rating;

                    const p = $("<p>").text("Rating: " + rating);

                    const animated = results[i].images.fixed_height.url;
                    const still = results[i].images.fixed_height_still.url;

                    const curbImage = $("<img>");
                    curbImage.attr("src", still);
                    curbImage.attr("data-still", still);
                    curbImage.attr("data-animate", animated);
                    curbImage.addClass("curbed-image");

                    curbDiv.append(p);
                    curbDiv.append(curbImage);

                    $('#curbed-gifs').append(curbDiv);
                }
            });
    });

    $(document).on('click', '.curbed-image', function () {
        const state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });

    $('#add-curbed').on('click', function (event) {
        event.preventDefault();
        const newCurb = $('input').eq(0).val();
        console.log(newCurb)
        if (newCurb.length > 2) {
            curb.push(newCurb);
        }

        populateButtons();
    });

    populateButtons();
});

