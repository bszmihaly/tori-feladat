var fromHolder = document.getElementById("formHolder");
var buttonHolder = document.getElementById("buttonVisibility");

var embed = document.getElementById("embed");
var questionHolder = document.getElementById("questionHolder");


var question = document.getElementById("question");

function makeVisible(field){
    field.style.visibility = "hidden";
    field.style.display = "none";
}

function makeHidden(field){
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
    if(questionData.questionType == "question"){
        //Display question
        makeVisible(questionHolder);
    }else if(questionData.questionType == "embed"){
        //Display learningapps etc.
        makeVisible(embed);
        //alert(questionData.embedSource);
    }
    if(questionData.answerType == "pickOne"){
        //Display 3 answers
        makeVisible(buttonHolder);
        //alert(questionData.answers);
    }else if(questionData.answerType == "typeAnswer"){
        //textInputfield
        makeVisible(fromHolder);
        //alert(questionData.correctAnswers);
    }
}

function CheckAnswerCorrectnessAndRedirectToNext(year, id, text){

    var questionData = localdata[year][id];
    if(questionData.answerType == "pickOne"){
        //Check answer correctness
        if(questionData.answers[0] == text){
            //SUCCESS GO TO NEXT YEAR
            CreateGameFieldForYear(year+1, 0)
        }else{
            //EPIC FAIL DO THE CIRCLE
            CreateGameFieldForYear(year, (id+1)%3)
        }
    }else if(questionData.answerType == "typeAnswer"){
        //text to lowercase and stuff for compatibility
        text = text.toLowerCase();
        //Check answer correctness
        if(questionData.correctAnswers.includes(text)){
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
    CreateGameFieldForYear(0, 1);
    
}

DoTheStart();