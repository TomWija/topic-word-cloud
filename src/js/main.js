const renderWordCloud = require("./setup/renderwordcloud.js"),
    setupClickEvents = require("./setup/setupclickevents.js"),
    topics = require("./topics/topics.json");

renderWordCloud(topics);
setupClickEvents(topics);
