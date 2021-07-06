var searchButton = document.getElementById("searchButton");
searchButton.onclick = function() {
    let base_url = window.location.origin
    keywordInput = document.getElementById("searchKeywordInput").value

    let url = base_url + "/findyouroutfit/find_category.html?q=" + encodeURIComponent(keywordInput)
    if(keywordInput !== ""){
        window.open(url, '_self')
    }
}

document.getElementById("searchKeywordInput").addEventListener("keypress", function(event) {
    if(event.keyCode == 13) {
        event.preventDefault();
        searchButton.click()
    }
})