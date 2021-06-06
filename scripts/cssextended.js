function StartTheHappenings(){
    var r = document.querySelector(':root');

    var inputboi = document.getElementById("input");
    var inputbutton = document.getElementById("inputButton");

    var inputfocused =false;


    var recolorme = document.getElementById("answerField");
    var bgcolor = "#aa6f34"

    inputboi.onfocus= function(){
        inputfocused = true;
        recolorme.style.backgroundColor="#332e2e";
    };
    inputboi.addEventListener("focusout", () => {recolorme.style.backgroundColor=bgcolor, inputfocused = false}, true);

    inputbutton.addEventListener("pointerenter", () => {recolorme.style.backgroundColor="#332e2e"}, true);
    inputbutton.addEventListener("pointerout", () => {if(!inputfocused){recolorme.style.backgroundColor=bgcolor}}, true);
    //r.setAttribute('--bgcol', "#332e2e");
}