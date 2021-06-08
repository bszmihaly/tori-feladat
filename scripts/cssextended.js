function StartTheHappenings(){
    var inputboi = document.getElementById("input");
    var inputbutton = document.getElementById("inputButton");
    var embed = document.getElementById("embed");

    var inputfocused =false;


    var recolorme = document.getElementById("answerField");
    var bgcolor = "#aa6f34"

    inputboi.addEventListener("focus", () => {recolorme.style.backgroundColor="#332e2e"; inputfocused = true;}, true)
    inputboi.addEventListener("focusout", () => {recolorme.style.backgroundColor=bgcolor; inputfocused = false}, true);

    inputbutton.addEventListener("pointerenter", () => {recolorme.style.backgroundColor="#332e2e"}, true);
    inputbutton.addEventListener("pointerout", () => {if(!inputfocused){recolorme.style.backgroundColor=bgcolor}}, true);

    embed.addEventListener("loadeddata", () => {embed.document.style.background = none;})
    //r.setAttribute('--bgcol', "#332e2e");
}