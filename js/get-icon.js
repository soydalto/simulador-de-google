function getValue(param) {
    let name = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


let URL = getValue("url");
let icon = document.querySelector(".icon");
icon.src = "img/directAccess/" + URL + ".png";
icon.width = "21"