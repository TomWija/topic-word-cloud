const renderStatistics = require("./renderstatistics.js");

/**
 * Sets up the event that allows a user to pick a word in the word cloud.
 */
module.exports = (topics) => {
    let wordCloud = document.getElementById("word-cloud"),
        words = wordCloud.getElementsByTagName("span");

    for (let i = 0; i < words.length; i++) {
        words[i].onclick = function() {
            if (this.classList.contains("focused")) {
                this.classList.add("focused");
            } else {
                for (let i = 0; i < words.length; i++) {
                    words[i].classList.remove("focused");
                }
                this.classList.add("focused");
            }
            renderStatistics(topics);
        };
    }
};
