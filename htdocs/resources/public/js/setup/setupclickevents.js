const renderStatistics = require("./renderstatistics.js").renderWords;

module.exports = (topics) => {
    /* Render information about clicked word */
    $("#word-cloud span").click(function() {
        if ($(this).hasClass("focused")) {
            $(this).removeClass("focused");
        } else {
            $("#word-cloud span").removeClass("focused");
            $(this).addClass("focused");
        }
        renderStatistics(topics);
    });
};
