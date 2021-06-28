var searchButton = document.getElementById("searchButton");
var keywordInput = [];
var dummyArray = ["Apple", "Pinapple", "Pen"];
searchButton.onclick = function() {
    keywordInput = document.getElementById("searchKeywordInput").value.split(" ")
}