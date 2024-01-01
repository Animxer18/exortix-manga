BASE_URL = "https://www.asianhdplay.org"

var iframe_url = ""

let searchParams = new URLSearchParams(window.location.search);
let mangaId = searchParams.get('id');
let mangaCh =  searchParams.get('ch');

const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

$(document).ready(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        if (!searchParams.has('ch'))
            window.location.href = `${window.location.href.split('?')[0]}?id=${searchParams.get('id')}&ch=1`;
        let mangaId = searchParams.get('id');
        let mangaCh =  searchParams.get('ch');
        getManga(mangaId, mangaCh);
    } else
        window.location.href = "../";
});

$( "#ch" ).change(function() {
    window.location.href = `${window.location.href.split('?')[0]}?id=${mangaId}&ch=${Number(document.getElementById('ch').value)}`;
});



function getManga(mangaId, mangaCh) {
    var url = `${BASE_URL}/${mangaId}`;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status == 200 && xhr.responseText.trim() != "404".trim()) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, "text/html");
            var chapters = Array.from(doc.querySelectorAll('#chapter-list > li > a')).reverse();
            // if (Number(mangaCh) > chapters.length || Number(mangaCh) < 1) {
                // window.location.href = `${window.location.href.split('?')[0]}?id=${mangaId}&ch=1`;
            // }
            
            if (Number(mangaCh) > chapters.length || Number(mangaCh) < 1) {
                window.location.href = `${window.location.href.split('?')[0]}?id=${mangaId}&ch=1`;
            }

            // iframe_url = doc.querySelector('iframe').getAttribute('src');
            title = doc.querySelector(".name.box > h1").innerText;
            
            document.title = title;

            // if(deviceType() == "desktop") {   
                // document.getElementById('main').innerHTML += 
                // `<iframe id="embedvideo" src="https:${iframe_url}" allowvr="yes"  allowfullscreen="true" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe>`           
            // } else {
                // document.getElementById('main').innerHTML += 
                // `<iframe id="embedvideo" src="https:${iframe_url}"sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" allowvr="yes"  allowfullscreen="true" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe>`
            // }

            var chapter = chapters[Number(mangaCh)-1]

            var url2 = `${BASE_URL}${chapter.pathname}`;
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url2);
            xhr2.onreadystatechange = function () {
                if (xhr2.readyState === 4) {
                    if (xhr2.status == 200 && xhr2.responseText.trim() != "404".trim()) {
                        var parser2 = new DOMParser();
                        var doc2 = parser2.parseFromString(xhr2.responseText, "text/html");

                        chapters.forEach( (e,i) => {
                            if (i+1 == Number(mangaCh)) {
                                document.getElementById('ch').innerHTML += `<option selected value = '${i+1}'>${i+1}</option>`;
                         } else {
                                document.getElementById('ch').innerHTML += `<option value = '${i+1}'>${i+1}</option>`;
                            }
                        });
                        title = doc2.querySelector("h1").innerText;
                        document.title = title;
                        var images = doc2.querySelector('#chapter-images');
                        document.getElementById('main').innerHTML = images.innerHTML;
                    }
            }};
            xhr2.send();
        } else
            window.location.href = "../";
    }};
    xhr.send();
}


setInterval(function(){ 
    console.clear();
}, 1000);

document.addEventListener('contextmenu', e => {  
    e.preventDefault();
});

document.onkeydown = e => {  
    if (e.keyCode == 123)
        return false;      
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0))
        return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0))
        return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0))
        return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == "U".charCodeAt(0))
        return false;
};
