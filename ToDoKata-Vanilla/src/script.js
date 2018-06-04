window.addEventListener("load", init, false);

var viewHandler = {
    initEventListeners : function () {
        document.getElementById("filterByToday").addEventListener("click", ()=>{
            console.log("Filter by today");
            ToDoModel.filterListOfToDosByDate();
        });
        document.getElementById("filterByWeek").addEventListener("click", ()=>{
            console.log("Filter by this week");
            ToDoModel.filterListOfToDosByDate();
        });
        document.getElementById("filterByMonth").addEventListener("click", ()=>{
            console.log("Filter by this month");
            ToDoModel.filterListOfToDosByDate();
        });
        document.getElementById("filterByBacklog").addEventListener("click", ()=>{
            console.log("Filter by Backlog");
        });
        document.getElementById("filterByInProgress").addEventListener("click", ()=>{
            console.log("Filter by In Progress");
        });
        document.getElementById("filterByDone").addEventListener("click", ()=>{
            console.log("Filter by Done");
        });
        document.getElementById("addTodo").addEventListener("click", ()=>{
            console.log("AddToDoPressed");
            document.getElementById("addToDoOverlay").setAttribute("style", "display: block");
            document.getElementById("addToDoDialogueBox").setAttribute("style", "display: block");
        });
        document.getElementById("addToDoOverlay").addEventListener("click", ()=>{
            document.getElementById("addToDoOverlay").setAttribute("style", "display: none");
            document.getElementById("addToDoDialogueBox").setAttribute("style", "display: none");
            viewHandler.clearAddToDoFormContent();
        });
        document.getElementById("executeAddToDo").addEventListener("click", ()=>{
            viewHandler.addToDo();
            viewHandler.clearAddToDoFormContent();
        });
    }
    , refreshListOfToDos : function(lsOfToDos){
        viewHandler.clearListOfTodos();

        dnToDoListMainView = document.getElementById("mainView");

        lsOfToDos.forEach((ToDo)=>{
            dnNewToDo = document.createElement("div");
            dnNewToDo.classList += "todoCard";

            dnNewToDoHeader = document.createElement("h3");
            dnNewToDoHeader.innerHTML = ToDo.title;

            dnNewToDo.appendChild(dnNewToDoHeader);

            dnNewToDoBody = document.createElement("p");
            dnNewToDoBody.innerHTML = ToDo.content;

            dnNewToDo.appendChild(dnNewToDoBody);

            dnNewToDoMetaBar = document.createElement("div");
            dnNewToDoMetaBar.classList += "metaBar";

                dnNewToDoMetaBarOwner = document.createElement("div");
                dnNewToDoMetaBarOwner.classList += "owner inline-block";
                dnNewToDoMetaBarOwner.innerHTML = ToDo.responsible;
                dnNewToDoMetaBar.appendChild(dnNewToDoMetaBarOwner);

                dnNewToDoMetaBarEstimate = document.createElement("div");
                dnNewToDoMetaBarEstimate.classList += "estimate inline-block";
                dnNewToDoMetaBarEstimate.innerHTML = ToDo.timeEstimate;
                dnNewToDoMetaBar.appendChild(dnNewToDoMetaBarEstimate);

                dnNewToDoMetaBarDueDate = document.createElement("div");
                dnNewToDoMetaBarDueDate.classList += "dueDate inline-block";
                dnNewToDoMetaBarDueDate.innerHTML = ToDo.dueDate;
                dnNewToDoMetaBar.appendChild(dnNewToDoMetaBarDueDate);

                dnNewToDoDoneButton = document.createElement("button");
                dnNewToDoDoneButton.classList += "done";
                dnNewToDoDoneButton.innerHTML = "-> Done"
                dnNewToDoMetaBar.appendChild(dnNewToDoDoneButton);

            dnNewToDo.appendChild(dnNewToDoMetaBar);

            dnToDoListMainView.appendChild(dnNewToDo);
        });
    }
    , addToDo : function(){
        var formDataValid = true;
        
        var title = document.getElementById("addToDoTitle").value;
        var content = document.getElementById("addToDoContent").value;
        var responsible = document.getElementById("addToDoResponsible").value;
        var dueDate = document.getElementById("addToDoDueDate").value;
        var timeEstimate = document.getElementById("addToDoEstimate").value;

        if (title == null || content == null || responsible == null || dueDate == null || timeEstimate == null) {
            formDataValid = false;
        }

        if(formDataValid){
            ToDoModel.addToDo(title, content, responsible, dueDate, timeEstimate);
        };
    }
    , clearListOfTodos : function(){
        dnToDoListMainView = document.getElementById("mainView");
        while(dnToDoListMainView.firstChild) {
            dnToDoListMainView.removeChild(dnToDoListMainView.firstChild);
        }
    }
    , buildResponsiblesList : function() {

    }
    , clearAddToDoFormContent : function(){
        document.getElementById("addToDoTitle").value = "";
        document.getElementById("addToDoContent").value = "";
        document.getElementById("addToDoResponsible").value = "";
        document.getElementById("addToDoDueDate").value = "";
        document.getElementById("addToDoEstimate").value = "";
    }

}

var ToDoModel = {
    lsToDos : []
    , addToDo : function (strTitle, strContent, strResponsible, dueDate, timeEstimate) {
        var newToDo = new ToDo(strTitle, strContent, strResponsible, dueDate, timeEstimate);
        ToDoModel.lsToDos.push(newToDo);
        viewHandler.refreshListOfToDos(ToDoModel.lsToDos);
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
    // ToDoModel.addToDo("1st Todo", "Working with plain JS can be fun.", "Clemens Stift", new Date(2018, 4, 28), 4);
    // ToDoModel.addToDo("2nd Todo", "Should you be motivated to figure out why all the frameworks exist.", "Marlon Alagoda", new Date(2018, 4, 30), 2);
    // ToDoModel.addToDo("3rd Todo", "Before switching to learn more about ReactJS", "Julian Tandler", new Date(2018, 5, 2), 2);

    console.log(document.getElementById("addToDoTitle"));

    viewHandler.initEventListeners();
}