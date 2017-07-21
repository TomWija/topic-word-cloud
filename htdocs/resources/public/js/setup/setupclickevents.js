const $ = require("jquery");

module.exports = () => {
    $("#word-cloud span").click(function() {
        $(this).toggleClass("focused");
    });
};
