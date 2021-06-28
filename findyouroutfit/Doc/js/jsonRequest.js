function getJsonObject() {
    var request = new XMLHttpRequest();
    request.open("GET", "json/outfit_labeled.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}