window.addEventListener("load", init, false);

var databaseService = {
    requestData : function(){

    }
    , pushData : function(){

    }
}

var viewHandler = {
    initEventListeners : function () {

    }
    , displayNewToDoDialogue : function() {

    }
    , displayListOfToDos : function(lsOfToDos){

    }
    , fetchToDoInputData : function(){

    }
    , 

}

var ToDoModel = {
    lsToDos : []
    , addToDo : function () {
        newTodo = new ToDo();
        lsToDos.push(newToDo);
    }
    , filterListOfToDosByDate : function(date){

    }
    , filterListOfToDosByResponsible : function(strResponsible){

    }
    , filterListOfToDosByStatus : function(statusIdenitifier){

    }
}

class ToDo {
    constructor(strTitle, strContent, strResponsible, dueDate, timeEstimate){
        this.title = strTitle;
        this.content = strContent;
        this.responsible = strResponsible;
        this.dueDate = dueDate;
        this.timeEstimate = timeEstimate;
    }
}

function init(){
    console.log("Loaded.");
}