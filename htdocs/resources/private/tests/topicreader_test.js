'use strict';

const expect = require('chai').expect
    , TopicReader = require('../../public/js/topic-reader.js')
    , testTopic1 = require('./test-resources/test-topic.json')
    , testTopic2 = require('./test-resources/test-topic2.json')
    , testTopics = require('./test-resources/test-topics.json');

describe('TopicReader', () => {
    it('should exist', () => {
        expect(TopicReader).to.not.be.undefined;
    });
});

describe('#transformTopicObj', () => {
    it('should return an Array with objects inside', () => {
        let actual = TopicReader.transformTopicObj(testTopic1);
        expect(actual).to.be.instanceOf(Array);

        for (let i of actual) {
            expect(i).to.be.an('object');
        }
    });

    it('should take an object with an array of topics, and return an array of topics with just their label, sentiment score, volume, fontsize and sentiment breakdown', () => {

        let actual = TopicReader.transformTopicObj(testTopic1);
        let expected = [{
                "label": "Berlin",
                "sentimentScore": 65,
                "sentimentOverall": 'positive',
                "volume": 165,
                "sentimentBreakdown": {
                    "positive": 29,
                    "neutral": 133,
                    "negative": 3
                },
                "fontSize": "size5"
        }];
        expect(actual).to.be.eql(expected);

        actual = TopicReader.transformTopicObj(testTopic2);
        expected = [{
                "label": "DJ",
                "sentimentScore": 54,
                "sentimentOverall": 'neutral',
                "volume": 48,
                "sentimentBreakdown": {
                    "neutral": 46,
                    "positive": 2
                },
                "fontSize": "size5"
        }];
        expect(actual).to.be.eql(expected);

        actual = TopicReader.transformTopicObj(testTopics);
        expected = [{
                "label": "Berlin",
                "sentimentScore": 65,
                "sentimentOverall": 'positive',
                "volume": 165,
                "sentimentBreakdown": {
                    "positive": 29,
                    "neutral": 133,
                    "negative": 3
                },
                "fontSize": "size5"
        },{
                "label": "DJ",
                "sentimentScore": 54,
                "sentimentOverall": 'neutral',
                "volume": 48,
                "sentimentBreakdown": {
                    "neutral": 46,
                    "positive": 2
                },
                "fontSize": "size0"
        }];
        expect(actual).to.be.eql(expected);
    });
});

describe('#mapVolumeToFontsize', () => {
    it('should return an Array', () => {
        let actual = TopicReader.mapVolumeToFontsize(testTopic1);
        expect(actual).to.be.instanceOf(Array);
    });

    it('should take an object with an array of topics, and return an object mapping a volume to a font size', () => {
        let actual = TopicReader.mapVolumeToFontsize(testTopic1);
        let expected = [0,27,54,81,108,135];
        expect(actual).to.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopic2);
        expected = [0, 8, 16, 24, 32, 40];
        expect(actual).to.be.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopics);
        expected = [48, 67, 86, 105, 124, 143];
        expect(actual).to.be.eql(expected);
    });

    it('should take an argument, skew, and return a result weighted to the left or right of the spectrum', () => {
        let actual = TopicReader.mapVolumeToFontsize(testTopic1, 'left');
        let expected = [0, 8, 16, 32, 65, 147];
        expect(actual).to.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopic2, 'left');
        expected = [0, 2, 4, 8, 17, 41];
        expect(actual).to.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopics, 'left');
        expected = [48, 53, 58, 69, 92, 150];
        expect(actual).to.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopic1, 'right');
        expected = [0, 82, 115, 131, 139, 147];
        expect(actual).to.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopic2, 'right');
        expected = [0, 24, 33, 37, 39, 41];
        expect(actual).to.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopics, 'right');
        expected = [48, 106, 129, 140, 145, 150];
        expect(actual).to.eql(expected);
    })
});

describe('#getHighestVolume and #getLowestVolume', () => {
    it('should return a number', () => {
        expect(TopicReader.getHighestVolume([])).to.be.a('number');
        expect(TopicReader.getLowestVolume([])).to.be.a('number');
    });

    it('show return the Highest/Lowest volume in an array of topics', () => {
        const input = [
            {
                "volume": 27
            },
            {
                "volume": 9
            },
            {
                "volume": 33
            },
            {
                "volume": 127
            },
        ];

        expect(TopicReader.getLowestVolume(input)).to.equal(9);
        expect(TopicReader.getHighestVolume(input)).to.equal(127);
    });

    it('should return 0 when 1 or less topics are passed to getLowestVolume', () => {
        expect(TopicReader.getLowestVolume([{"volume": 10}])).to.equal(0);
        expect(TopicReader.getHighestVolume([{"volume": 10}])).to.equal(10);
    });
});
