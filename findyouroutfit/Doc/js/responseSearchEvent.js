window.onload = function() {
    let url = document.location.href
    console.info(url.split('?').length)
    if(url.split('?').length > 1) {
        let params = url.split('?')[1].split('=')[1].split("%20")
        let param = "";
        for (let item of params) {
            param += item + " "
        }
        searchWithKeyword(params);
        document.getElementById("searchKeywordInput").value = param.trim()
    } else {
        showImages([])
    }
}

let activeData = [];
let filterButton = document.getElementById("filterButton");
filterButton.onclick = function() {
    let jkSelect = document.getElementById("jkSelect")
    let jkItemSelected = jkSelect.options[jkSelect.selectedIndex].text
    let atasanFilter = []
    let bawahanFilter = []
    let aksesorisFilter = []
    let warnaFilter = []

    let itemSelected = document.querySelectorAll('input[name="atasan[]"]:checked')
    for(let item of itemSelected) {
        atasanFilter.push(item.value)
    }

    itemSelected = document.querySelectorAll('input[name="bawahan[]"]:checked')
    for(let item of itemSelected) {
        bawahanFilter.push(item.value)
    }

    itemSelected = document.querySelectorAll('input[name="aksesoris[]"]:checked')
    for(let item of itemSelected) {
        aksesorisFilter.push(item.value)
    }

    itemSelected = document.querySelectorAll('input[name="warna[]"]:checked')
    for(let item of itemSelected) {
        warnaFilter.push(item.value)
    }

    applyFilter(jkItemSelected, atasanFilter, bawahanFilter, aksesorisFilter, warnaFilter)
}

/**
 * 
 * @param {Array} params 
 */
function showImages(params) {
    var images = params;

    var container = document.getElementById("item-container")
    var child = container.firstElementChild
    while(child) {
        child.remove()
        child = container.firstElementChild
    }

    if(images[0] === "Not found") {
        document.getElementById("data-count").innerHTML = "0 Data Found"
        var div_item = document.createElement("div")
        div_item.className = "grid-item"
        div_item.innerHTML = '<img src="assets/img/No_image_found_3.png" style="width:100%"/>'
        container.appendChild(div_item)
        return
    }

    if(images.length == 0) {
        images = getJsonObject()
        activeData = images
    }

    for (let item of images) {
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

    document.getElementById("data-count").innerHTML = images.length + " Data Found"
}

/**
 * 
 * @param {String} jk 
 * @param {Array} filterAtasan 
 * @param {Array} filterBawahan 
 * @param {Array} filterAksesoris 
 * @param {Array} filterWarna 
 */
 function applyFilter(jk, filterAtasan, filterBawahan, filterAksesoris, filterWarna) {
    let filteredResult = []

    if( jk == "All" && filterAtasan.length == 0 && filterAksesoris.length == 0 && filterBawahan.length == 0 && filterWarna.length == 0) {
        showImages([])
    }

    for(item of activeData) {
        let results = item.annotations[0].result
        let isJkFilterSuit = jk == "All"
        let isAtasanFilterSuit = filterAtasan.length == 0
        let isBawahanFilterSuit = filterBawahan.length == 0
        let isAksesorisFilterSuit = filterAksesoris.length == 0
        let isWarnaFilterSuit = filterWarna.length == 0

        for(result of results) {
            if(result.from_name == "Atasan") {
                for(choice of result.value.choices) {
                    if(filterAtasan.includes(choice.toLowerCase()) && !isAtasanFilterSuit){
                        isAtasanFilterSuit = true
                        continue
                    }
                }
            }

            if(result.from_name == "Bawahan") {
                for(choice of result.value.choices) {
                    if(filterBawahan.includes(choice.toLowerCase()) && !isBawahanFilterSuit){
                        isBawahanFilterSuit = true
                        continue
                    }
                }
            }

            if(result.from_name == "Aksesoris") {
                for(choice of result.value.choices) {
                    if(filterAksesoris.includes(choice.toLowerCase()) && !isAksesorisFilterSuit){
                        isAksesorisFilterSuit = true
                        continue
                    }
                }
            }

            if(result.from_name == "Warna") {
                for(choice of result.value.choices) {
                    if(filterWarna.includes(choice.toLowerCase()) && !isWarnaFilterSuit){
                        isWarnaFilterSuit = true
                        continue
                    }
                }
            }

            if(result.from_name == "Jenis Kelamin") {
                for(choice of result.value.choices) {

                    if(jk.toLowerCase() === choice.toLowerCase() && !isJkFilterSuit){
                        isJkFilterSuit = true
                        continue
                    }
                }
            }
        }

        if(isJkFilterSuit && isAtasanFilterSuit && isBawahanFilterSuit && isAksesorisFilterSuit && isWarnaFilterSuit) {
            filteredResult.push(item)
        }
    }

    if(filteredResult.length == 0) {
        filteredResult.push("Not found")
    }
    console.table(filteredResult)
    showImages(filteredResult)
}

/**
 * 
 * @param {Array} params 
 */
function searchWithKeyword(params){
    let cleanedParams = [];
    for(let param of params) {
        cleanedParams.push(param.toLowerCase().trim());
    }

    let searchResult = []
    let allItem = getJsonObject()
    for(let item of allItem) {
        let results = item.annotations[0].result
        let suitedCategory = 0
        for(let result of results) {
            let choices = result.value.choices
            for(let choice of choices) {
                if(cleanedParams.includes(choice.toLowerCase())) {
                    suitedCategory++;
                }
                if(suitedCategory === params.length) {
                    break;
                }
            }
            if(suitedCategory === params.length) {
                break;
            }
        }
        if(suitedCategory === params.length) {
            searchResult.push(item)
        }
    }

    if(searchResult.length == 0) {
        searchResult.push("Not found")
    }
    activeData = searchResult
    showImages(searchResult)
}

function getJsonObject() {
    var request = new XMLHttpRequest();
    request.open("GET", "json/outfit_labeled.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}