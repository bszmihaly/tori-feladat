var fromHolder = document.getElementById("formHolder");
var buttonHolder = document.getElementById("buttonVisibility");

var btns = [document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3")];
var sbmtbtn = document.getElementById("inputButton");
var input = document.getElementById("input");
var ytitle = document.getElementById("questionTitle");

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
    }
    if(questionData.answerType == "pickOne"){
        //Display 3 answers
        offset = Math.floor(Math.random()*3);
        btns[0].innerText = questionData.answers[offset%3];
        btns[1].innerText = questionData.answers[(offset+1)%3];
        btns[2].innerText = questionData.answers[(offset+2)%3];

        btns[0].addEventListener("click", ()=>{CheckAnswerCorrectnessAndRedirectToNext(year, id, questionData.answers[offset%3])});
        btns[1].addEventListener("click", ()=>{CheckAnswerCorrectnessAndRedirectToNext(year, id, questionData.answers[(offset+1)%3])});
        btns[2].addEventListener("click", ()=>{CheckAnswerCorrectnessAndRedirectToNext(year, id, questionData.answers[(offset+2)%3])});
        makeVisible(buttonHolder);
        //alert(questionData.answers);
    }else if(questionData.answerType == "typeAnswer"){
        //textInputfield
        input.value = "";
        makeVisible(fromHolder);
        sbmtbtn.addEventListener("click", () => {CheckAnswerCorrectnessAndRedirectToNext(year, id, input.value); input.value = "";});
        //alert(questionData.correctAnswers);
    }
}

function CheckAnswerCorrectnessAndRedirectToNext(year, id, text){

    var questionData = data[year].data[id];
    if(questionData.answerType == "pickOne"){
        //Check answer correctness
        if(questionData.answers[0] == text){
            //SUCCESS GO TO NEXT YEAR
            CreateGameFieldForYear(year+1, 0)
        }else{
            //EPIC FAIL DO THE CIRCLE
            //btns[(offset*2)%3].style.backgroundColor = "green";
            //setTimeout(function(){btns[offset%3].style.backgroundColor = "peru";btnpressed = false; CreateGameFieldForYear(year, (id+1)%3)}, 3000);
            CreateGameFieldForYear(year, (id+1)%3)
        }
    }else if(questionData.answerType == "typeAnswer"){
        text = text.toLowerCase();
        //Check answer correctness
        if(questionData.answers.map(word => word.toLowerCase()).includes(text)){
            //SUCCESS GO TO NEXT YEAR
            CreateGameFieldForYear(year+1, 0)
        }else{
            //EPIC FAIL DO THE CIRCLE
            CreateGameFieldForYear(year, (id+1)%3)
        }
    }
}


function DoTheStart(){
    StartTheHappenings();
    CreateGameFieldForYear(0, 0);
    
}

DoTheStart();