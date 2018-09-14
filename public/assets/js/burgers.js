// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".submitdiv").on("click", ".submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#textarea").val().trim(),
            devoured: 0
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("added new burger");

                // reload .to-devour to get updated list
                $(".to-devour").load(location.href + " .to-devour>*", "");
            }
        );
    });

    $(".to-devour").on("click", ".change-devour", function () {
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        var newDevouredState = {
            devoured: newDevour
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function () {
            console.log("changed devoured state to", newDevour);
            // Reload the page to get the updated list
            $(".to-devour").load(location.href + " .to-devour>*", "");
            $(".devoured").load(location.href + " .devoured>*", "");
        });
    });
});