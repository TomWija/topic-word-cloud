const TopicReader = require("../utilities/topicreader.js");

/**
 * Used to render the word cloud itself, assigning the relevant classes to the
 * words themselves. Also shuffles the topics around so the word cloud is rendered
 * differently on every page load.
 */
module.exports = (topics) => {
    const wordCloudColumn = document.getElementById("word-cloud"),
        processedTopics = TopicReader.transformTopicObj(topics, "left");

    TopicReader.shuffle(processedTopics);

    processedTopics.forEach((topic) => {
        // Format Label to keep spaced words on same level
        topic.label = topic.label.replace(/ /gi, "&nbsp;");

        wordCloudColumn.innerHTML += `<span class="${topic.fontSize} ${topic.sentimentOverall} word-cloud__topic" data-id="${topic.id}">${topic.label}</span> `;
    });
};
