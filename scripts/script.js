var fromHolder = document.getElementById("formHolder");
var buttonHolder = document.getElementById("buttonVisibility");

var btns = [document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3")];
var sbmtbtn = document.getElementById("inputButton");
var input = document.getElementById("input");
var ytitle = document.getElementById("questionTitle");
var table = document.getElementById("table");
var embed = document.getElementById("embed");
var questionHolder = document.getElementById("questionHolder");


var question = document.getElementById("question");

var offset = Math.floor(Math.random()*3);

function makeHidden(field){
    field.style.visibility = "hidden";
    field.style.display = "none";
}

function makeVisible(field){
    field.style.visibility = "visible";
    field.style.display = "inherit";
}

makeHidden(fromHolder);
makeHidden(buttonHolder);
makeHidden(embed);
makeHidden(questionHolder);

function FillInCorrectnessToTable(year, id, correct){
    col = "";
    if(correct){
        col = "green";
    }else{
        col = "red";
    }
    table.rows[year+1].cells[id+1].style.backgroundColor = col;
}

function CreateGameFieldForYear(year, id){
    makeHidden(fromHolder);
    makeHidden(buttonHolder);
    makeHidden(embed);
    makeHidden(questionHolder);
    id = id%3;
    //alert(localdata[year].title);
    var questionData = data[year].data[id];
    ytitle.innerText = data[year].title;
    if(questionData.questionType == "question"){
        //Display question
        //alert(questionData.question);
        question.innerText = questionData.question;
        makeVisible(questionHolder);
    }else if(questionData.questionType == "embed"){
        //Display learningapps etc.
        embed.src = questionData.embedSource;
        makeVisible(embed);
        
        //alert(questionData.embedSource);
        //alert(questionData.embedSource);
    }else if(questionData.questionType == "FIN"){
        question.innerText = questionData.question;
        makeVisible(questionHolder);
    }
    if(questionData.answerType == "pickOne"){
        //Display 3 answers
        btnClones = [btns[0].cloneNode(true), btns[1].cloneNode(true), btns[2].cloneNode(true)];

        offset = Math.floor(Math.random()*3);
        btns[0].innerText = questionData.answers[offset%3];
        btns[1].innerText = questionData.answers[(offset+1)%3];
        btns[2].innerText = questionData.answers[(offset+2)%3];

        try {
            btns[0].onclick = null;
            btns[1].onclick = null;
            btns[2].onclick = null;
        } catch (error) {
            console.log(error);
        }
        

        btns[0].onclick = () => {CheckAnswerCorrectnessAndRedirectToNext(year, id, questionData.answers[offset%3])};
        btns[1].onclick = () => {CheckAnswerCorrectnessAndRedirectToNext(year, id, questionData.answers[(offset+1)%3])};
        btns[2].onclick = () => {CheckAnswerCorrectnessAndRedirectToNext(year, id, questionData.answers[(offset+2)%3])};
        
        makeVisible(buttonHolder);
        //alert(questionData.answers);
    }else if(questionData.answerType == "typeAnswer"){
        //textInputfield
        input.value = "";
        makeVisible(fromHolder);
        sbmtbtn.addEventListener("click", () => {CheckAnswerCorrectnessAndRedirectToNext(year, id, input.value); input.value = "";});
        //alert(questionData.correctAnswers);
    }else if(questionData.answerType == "none"){

    }
}

function CheckAnswerCorrectnessAndRedirectToNext(year, id, text){

    var questionData = data[year].data[id];
    if(questionData.answerType == "pickOne"){
        //Check answer correctness
        if(questionData.answers[0] == text){
            FillInCorrectnessToTable(year, id, true)
            //SUCCESS GO TO NEXT YEAR
            console.log(`success at ${year}, ${id}, ${questionData.question}, ${questionData.embedSource}, ${text}`)
        }else{
            FillInCorrectnessToTable(year, id, false)
            //EPIC FAIL DO THE CIRCLE
            //btns[(offset*2)%3].style.backgroundColor = "green";
            //setTimeout(function(){btns[offset%3].style.backgroundColor = "peru";btnpressed = false; CreateGameFieldForYear(year, (id+1)%3)}, 3000);
            console.log(`failure at ${year}, ${id}, ${questionData.question}, ${questionData.embedSource}, ${text}`);
        }
    }else if(questionData.answerType == "typeAnswer"){
        text = text.toLowerCase();
        //Check answer correctness
        if(questionData.answers.map(word => word.toLowerCase()).includes(text)){
            FillInCorrectnessToTable(year, id, true);
            //SUCCESS GO TO NEXT YEAR
        }else{
            FillInCorrectnessToTable(year, id, false);
            //EPIC FAIL DO THE CIRCLE
        }
    }
    if(id == 2){
        CreateGameFieldForYear(year+1, 0);
    }else{
        CreateGameFieldForYear(year, (id+1)%3);
    }
}


function DoTheStart(){
    StartTheHappenings();
    CreateGameFieldForYear(0, 0);
    
}

DoTheStart();