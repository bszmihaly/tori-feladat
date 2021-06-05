const localdata = data;
var globalYear;

function CreateGameFieldForYear(year, id){
    var questionArea = document.getElementById("questionRow");
    var answerArea = document.getElementById("answerRow");


    var questionData = localdata[year][id];
    if(questionData.questionType == "question"){
        //Display question
    }else if(questionData.questionType == "embed"){
        //Display learningapps etc.
    }
    if(questionData.answerType == "pickOne"){
        //Display 3 answers
    }else if(questionData.answerType == "typeAnswer"){
        //textInputfield
    }
}

function CheckAnswerCorrectnessAndRedirectToNext(year, id, text){

    //DELETE previous question html objects please, so there wont be overfill issues

    var questionData = localdata[year][id];
    if(questionData.answerType == "pickOne"){
        //Check answer correctness
        if(questionData.answers[0] == text){
            //SUCCESS GO TO NEXT YEAR
        }else{
            //EPIC FAIL DO THE CIRCLE
        }
    }else if(questionData.answerType == "typeAnswer"){
        //text to lowercase and stuff for compatibility
        text = text.toLowerCase();
        //Check answer correctness
        if(questionData.correctAnswers.includes(text)){
            //SUCCESS GO TO NEXT YEAR
        }else{
            //EPIC FAIL DO THE CIRCLE
        }
    }
}

function DoTheStart(){

}

DoTheStart();