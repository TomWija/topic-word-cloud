const TopicReader = require("../utilities/topic-reader.js");

module.exports = {
    renderWords: function(topicsObj) {
        let topicInfo = [],
            totalMentions = 0,
            totalPositiveSentiment = 0,
            totalNeutralSentiment = 0,
            totalNegativeSentiment = 0;

        /* Render Statistics for chosen Labels */
        $("#word-cloud .focused").each(function() {
            topicInfo.push(TopicReader.findTopicById(topicsObj.topics, $(this).data("id")));
        });

        topicInfo.forEach((topic) => {
            totalMentions += parseInt(topic.volume);
            totalPositiveSentiment += parseInt(topic.sentimentBreakdown.positive);
            totalNeutralSentiment += parseInt(topic.sentimentBreakdown.neutral);
            totalNegativeSentiment += parseInt(topic.sentimentBreakdown.negative);
        });

        $("#total-mentions").text(totalMentions);
        $("#positive-mentions").text(totalPositiveSentiment);
        $("#neutral-mentions").text(totalNeutralSentiment);
        $("#negative-mentions").text(totalNegativeSentiment);
    }
};
