const localdata = data;
var globalYear;

function CreateGameFieldForYear(year, id){
    var questionArea = document.getElementById("questionRow");
    var answerArea = document.getElementById("answerRow");


    var questionData = data[year][id];
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

    var questionData = data[year][id];
    if(questionData.answerType == "pickOne"){
        //Check answer correctness
        if(questionData.answers["0"] == text){
            //SUCCESS GO TO NEXT YEAR
        }else{
            //EPIC FAIL DO THE CIRCLE
        }
    }else if(questionData.answerType == "typeAnswer"){
        //Check answer correctness
        if(questionData.correctAnswers.includes(text)){
            //SUCCESS GO TO NEXT YEAR
        }else{
            //EPIC FAIL DO THE CIRCLE
        }
    }
}