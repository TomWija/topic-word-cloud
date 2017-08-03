const TopicReader = require("../utilities/topic-reader.js");

/**
 * Renders the statistics for any chosen labels in the word-cloud.
 */
module.exports = (topicsObj) => {

    let topic;

    $("#word-cloud .focused").each(function() {
        topic = TopicReader.findTopicById(topicsObj.topics, $(this).data("id"));
    });

    $("#label").text(topic ? "\"" + topic.label + "\"" : "");
    $("#total-mentions").text(topic ? topic.volume : 0);
    $("#positive-mentions").text(topic ? topic.sentimentBreakdown.positive : 0);
    $("#neutral-mentions").text(topic ? topic.sentimentBreakdown.neutral : 0);
    $("#negative-mentions").text(topic ? topic.sentimentBreakdown.negative : 0);
};
