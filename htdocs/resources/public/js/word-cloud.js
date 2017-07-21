const $ = require('jquery')
    , TopicReader = require('./topic-reader.js')
    , topics = require('./topics/topics.json');

module.exports = () => {
    const $wordCloudColumn = $('#word-cloud')
        , processedTopics = TopicReader.transformTopicObj(topics, 'left');

    TopicReader.shuffle(processedTopics);

    processedTopics.forEach((topic) => {
        $wordCloudColumn.append(`<span class="${topic.fontSize} ${topic.sentimentOverall}">${topic.label}</span> `);
    })
}
