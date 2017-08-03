const TopicReader = require("../utilities/topicreader.js");

/**
 * Renders the statistics for any chosen labels in the word-cloud.
 */
module.exports = (topicsObj) => {

    let topic,
        wordCloud = document.getElementById("word-cloud"),
        label = document.getElementById("label"),
        totalMentions = document.getElementById("total-mentions"),
        positiveMentions = document.getElementById("positive-mentions"),
        neutralMentions = document.getElementById("neutral-mentions"),
        negativeMentions = document.getElementById("negative-mentions"),
        focusedWords = wordCloud.getElementsByClassName("focused");

    for(let i = 0; i < focusedWords.length; i++) {
        topic = TopicReader.findTopicById(topicsObj.topics, focusedWords[i].getAttribute("data-id"));
    }

    label.innerHTML = topic ? "\"" + topic.label + "\"" : "";
    totalMentions.innerHTML = topic ? topic.volume : 0;
    positiveMentions.innerHTML = topic ? topic.sentimentBreakdown.positive : 0;
    neutralMentions.innerHTML = topic ? topic.sentimentBreakdown.neutral : 0;
    negativeMentions.innerHTML = topic ? topic.sentimentBreakdown.negative : 0;
};
