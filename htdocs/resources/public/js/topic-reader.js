const TopicReader = {
    transformTopicObj: function(topicsObj) {
        let transformedTopics = topicsObj.topics.map((topic) => {
            let sentimentOverall = 'neutral';
            if (topic.sentimentScore > 60) sentimentOverall = 'positive';
            if (topic.sentimentScore < 40) sentimentOverall = 'negative';

            return {
                "label": topic.label,
                "sentimentScore": topic.sentimentScore,
                "sentimentOverall": sentimentOverall,
                "volume": topic.volume,
                "sentimentBreakdown": topic.sentiment,
                "fontSize": "size0"
            }
        });

        return transformedTopics;
    },

    mapVolumeToFontsize: function(topicsObj) {
        let lowest = this.getLowestVolume(topicsObj.topics)
          , highest = this.getHighestVolume(topicsObj.topics)
          , sizes = [];

        const steps = 6
            , stepValue = Math.floor((highest - lowest)/steps);

        for(let i = 0; i < steps; i++) {
            sizes['size' + i] = lowest + stepValue * i;
        }

        return sizes;
    },

    getHighestVolume: function(topics) {
        return Math.max.apply(Math, topics.map((topic) => {return topic.volume}));
    },

    getLowestVolume: function(topics) {
        return topics.length <= 1 ? 0 : Math.min.apply(Math, topics.map((topic) => {return topic.volume}));
    },
}

module.exports = TopicReader;
