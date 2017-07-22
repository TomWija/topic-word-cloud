const renderStatistics = require("./renderstatistics.js").renderWords;

module.exports = (topics) => {
    /* Render information about clicked word */
    $("#word-cloud span").click(function() {
        $(this).toggleClass("focused");
        renderStatistics(topics);
    });

    /* Reset all the words */
    $("#clear-words-btn").click(function() {
        $("#word-cloud span").removeClass("focused");
        renderStatistics(topics);
    });
};
