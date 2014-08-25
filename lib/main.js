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
    worker.port.on("response", bookmarkUrl);
};

function bookmarkUrl(desc) {
    let url = buildUrl(desc);
    openUrl(url)
};

function buildUrl(desc) {
    let url = 'spillo:///bookmark?';
    let tab = tabs.activeTab;

    url += 'url' + '=' + encodeURIComponent(tab.url);
    url += '&';
    url += 'title' + '=' + encodeURIComponent(tab.title);
    url += '&';
    url += 'desc' + '=' + encodeURIComponent(desc);

    return url;
}

function openUrl(url) {
    let tab = tabs.activeTab;
    tabs.open(url);

    timer.setTimeout(function() {
        tabs.activeTab.close()
        tab.activate()
    }, 100)
}
