
self.port.on("request", function(message) {
    var meta = document.getElementsByTagName("meta");
    var desc = ''

    for (var idx = 0; idx < meta.length; idx++) {
        if (meta[idx].name.toLowerCase() === "description") {
            desc = meta[idx].content;
            break;
        }
    }

    self.port.emit("response", desc);
});
