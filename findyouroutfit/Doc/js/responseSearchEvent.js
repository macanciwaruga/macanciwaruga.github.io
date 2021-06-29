window.onload = function() {
    showImages()
    let url = document.location.href
    console.info(url.split('?').length)
    if(url.split('?').length > 1) {
        let params = url.split('?')[1].split('=')[1].split("%20")
        let param = "";
        for (let item of params) {
            param += item + " "
        }
        document.getElementById("searchKeywordInput").value = param
    }
}

function showImages() {
    var obj = getJsonObject()
    var images = []
    var container = document.getElementById("item-container")
    for (let item of obj) {
        //container.innerHTML = '<div class="grid-item"><img src="assets/img/outfit/' + item.file_upload + '"/></div>'
        var div_item = document.createElement("div")
        div_item.className = "grid-item"
        div_item.innerHTML = '<img src="assets/img/outfit/' + item.file_upload + '"/>'
        container.appendChild(div_item)
    }

    const grid = document.querySelector(".grid")
    imagesLoaded(grid, function(){
        const mansonry = new Masonry(grid, {
            itemSelector: '.grid-item', 
            gutter: 20, 
        })
    })

    document.getElementById("data-count").innerHTML = obj.length + " Data Found"

}

function getJsonObject() {
    var request = new XMLHttpRequest();
    request.open("GET", "json/outfit_labeled.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}