const $ = require('jquery')
    , TopicReader = require('./topic-reader.js')
    , topics = require('./topics/topics.json');

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

module.exports = () => {
    const $wordCloudColumn = $('#word-cloud')
        , processedTopics = TopicReader.transformTopicObj(topics, 'left');

    shuffle(processedTopics);

    processedTopics.forEach((topic) => {
        $wordCloudColumn.append(`<span class="${topic.fontSize} ${topic.sentimentOverall}">${topic.label}</span> `);
    })
}
