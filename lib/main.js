var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var self = require("sdk/self");
var timer = require("sdk/timers");

var button = buttons.ActionButton({
  id: "spillo-link",
  label: "Add bookmark to Spillo",
  icon: {
    "16": "./toolbar.png",
    "32": "./toolbar.png",
    "64": "./toolbar@2x.png"
  },
  onClick: queryDom
});

function queryDom() {
    let worker = tabs.activeTab.attach({
        contentScriptFile: self.data.url("content-script.js")
    });

    worker.port.emit("request");
    worker.port.on("response", buildUrl);
};

function buildUrl(desc) {
    var location = 'spillo:///bookmark?';
    var tab = tabs.activeTab;

    location += 'url' + '=' + encodeURIComponent(tab.url);
    location += '&';
    location += 'title' + '=' + encodeURIComponent(tab.title);
    location += '&';
    location += 'desc' + '=' + encodeURIComponent(desc);

    tabs.open(location);
    timer.setTimeout(function() {
        tabs.activeTab.close()
    }, 500)
};
