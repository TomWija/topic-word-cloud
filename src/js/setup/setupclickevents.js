const renderStatistics = require("./renderstatistics.js");

/**
 * Sets up the event that allows a user to pick a word in the word cloud. 
 */
module.exports = (topics) => {
    $("#word-cloud span").on("click", function() {
        if ($(this).hasClass("focused")) {
            $(this).removeClass("focused");
        } else {
            $("#word-cloud span").removeClass("focused");
            $(this).addClass("focused");
        }
        renderStatistics(topics);
    });
};
