const TopicReader = require("../utilities/topic-reader.js");

/**
 * Used to render the word cloud itself, assigning the relevant classes to the
 * words themselves. Also shuffles the topics around so the word cloud is rendered
 * differently on every page load.
 */
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
