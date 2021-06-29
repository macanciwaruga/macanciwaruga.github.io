var searchButton = document.getElementById("searchButton");
var keywordInput = [];
var dummyArray = ["Apple", "Pinapple", "Pen"];
searchButton.onclick = function() {
    let base_url = window.location.origin
    keywordInput = document.getElementById("searchKeywordInput")
    alert(base_url)
}