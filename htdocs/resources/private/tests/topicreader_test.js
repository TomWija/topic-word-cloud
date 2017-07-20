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
                "fontSize": "size0"
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
                "fontSize": "size0"
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
                "fontSize": "size0"
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
        let expected = [];

        expected['size0'] = 135;
        expected['size1'] = 108;
        expected['size2'] = 81;
        expected['size3'] = 54;
        expected['size4'] = 27;
        expected['size5'] = 0;

        expect(actual).to.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopic2);

        expected['size0'] = 40;
        expected['size1'] = 32;
        expected['size2'] = 24;
        expected['size3'] = 16;
        expected['size4'] = 8;
        expected['size5'] = 0;

        expect(actual).to.be.eql(expected);

        actual = TopicReader.mapVolumeToFontsize(testTopics);

        expected['size0'] = 143;
        expected['size1'] = 124;
        expected['size2'] = 105;
        expected['size3'] = 86;
        expected['size4'] = 67;
        expected['size5'] = 48;

        expect(actual).to.be.eql(expected);
    });
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
