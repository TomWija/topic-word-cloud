const TopicReader = require("../utilities/topic-reader.js");

module.exports = (topics) => {
    const $wordCloudColumn = $("#word-cloud"),
        processedTopics = TopicReader.transformTopicObj(topics, "left");

    TopicReader.shuffle(processedTopics);

    processedTopics.forEach((topic) => {

        // Format Label to keep spaced words on same level
        topic.label = topic.label.replace(/ /gi, "&nbsp;");

        $wordCloudColumn.append(`<span class="${topic.fontSize} ${topic.sentimentOverall} word-cloud__topic" data-id="${topic.id}">${topic.label}</span> `);
    });
};
