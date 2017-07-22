const TopicReader = {
    /**
     * Transforms a Json Object with an array of topics into an array
     * of topics with data relevant to rendering the word-cloud.
     *
     * @param {object} topicsObj
     * @param {String} skew used to skew the font size. Can be "balanced", "left" or "right"
     * @returns {Array}
     */
    transformTopicObj: function(topicsObj, skew = "balanced") {
        const volumeToFontSize = this.mapVolumeToFontsize(topicsObj, skew);

        let transformedTopics = topicsObj.topics.map((topic) => {

            let sentimentOverall = "neutral",
                fontSize = "size5";

            if (topic.sentimentScore > 60) sentimentOverall = "positive";
            if (topic.sentimentScore < 40) sentimentOverall = "negative";

            for(let i = 0; i < volumeToFontSize.length; i++) {
                if(topic.volume >= volumeToFontSize[i]) fontSize = `size${i}`;
            }

            return {
                "id": topic.id,
                "label": topic.label,
                "sentimentScore": topic.sentimentScore,
                "sentimentOverall": sentimentOverall,
                "volume": topic.volume,
                "sentimentBreakdown": topic.sentiment,
                "fontSize": fontSize
            };
        });

        return transformedTopics;
    },

    findTopicById: function(topics, id) {
        try {
            if(topics && id) {
                const topic = topics.find((item) => item.id == id);

                if(topic) {
                    if(!topic.sentiment.negative) topic.sentiment.negative = 0;
                    if(!topic.sentiment.neutral) topic.sentiment.neutral = 0;
                    if(!topic.sentiment.positive) topic.sentiment.positive = 0;

                    return {
                        "label": topic.label,
                        "volume": topic.volume,
                        "sentimentBreakdown": topic.sentiment
                    };
                }
                return false;
            }
            return false;
        } catch (error) {
            return false;
        }
    },

    /**
     * Splits the volumes of the given topics in 6 sections.
     * If a skew is set, will weight the results to either the higher or lower
     * end of the spectrum.
     *
     * Use "left" skew if there are loads of values with a low volume and only one or two with large volumes
     * Use "right" skew if there are loads of values with a large volume and only one or two with small volumes
     * Use "balanced" skew if there is an even mix of both high and low values
     *
     * @param {object} topicsObj
     * @param {String} skew Can be either "balanced", "right" or "left"
     * @returns {Array}
     */
    mapVolumeToFontsize: function(topicsObj, skew = "balanced") {
        const steps = 6
            , lowest = this.getLowestVolume(topicsObj.topics)
            , highest = this.getHighestVolume(topicsObj.topics)
            , range = highest - lowest
            , stepValue = Math.floor(range/steps);

        let sizes = [];

        if (skew === "left") {
            sizes[0] = lowest;
            sizes[1] = sizes[0] + Math.floor(range/20);
            sizes[2] = sizes[1] + Math.floor(range/20);
            sizes[3] = sizes[2] + Math.floor(range/10);
            sizes[4] = sizes[3] + Math.floor(range/5);
            sizes[5] = sizes[4] + Math.floor(range/2);
        } else if (skew === "right") {
            sizes[0] = lowest;
            sizes[1] = sizes[0] + Math.floor(range/2);
            sizes[2] = sizes[1] + Math.floor(range/5);
            sizes[3] = sizes[2] + Math.floor(range/10);
            sizes[4] = sizes[3] + Math.floor(range/20);
            sizes[5] = sizes[4] + Math.floor(range/20);
        } else {
            for(let i = 0; i < steps; i++) {
                sizes.push(lowest + stepValue * i);
            }
        }

        return sizes;
    },

    /**
     * Get the highest volume in a list of topics
     *
     * @param {object} topics
     * @returns {Number}
     */
    getHighestVolume: function(topics) {
        return Math.max.apply(Math, topics.map((topic) => {return topic.volume;}));
    },

    /**
     * Get the lowest volume in a list of topics
     *
     * @param {object} topics
     * @returns {Number}
     */
    getLowestVolume: function(topics) {
        return topics.length <= 1 ? 0 : Math.min.apply(Math, topics.map((topic) => {return topic.volume;}));
    },

    /**
     * Shuffles array in place.
     * @param {Array} a items The array containing the items.
     * @returns {Array} array containing shuffled items
     */
    shuffle: function(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
        return a;
    }
};

module.exports = TopicReader;
