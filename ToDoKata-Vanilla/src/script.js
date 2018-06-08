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
        viewHandler.initializeDoneListeners();
    }
    , initializeDoneListeners : function() {

        var listOfNodes = document.getElementsByClassName("done");
        Array.from(listOfNodes).forEach((dn) => {
            dn.removeEventListener("click", (e)=>{
                console.log(e.target.parentNode.parentNode);
                viewHandler.removeToDo(e.target.parentNode.parentNode.getAttribute("index"));
            });
            dn.addEventListener("click", (e)=>{
                console.log(e.target.parentNode.parentNode);
                viewHandler.removeToDo(e.target.parentNode.parentNode.getAttribute("index"));
            });
          });
    }
    , renderToDoCard : function(ToDo){
        dnToDoListMainView = document.getElementById("mainView");

        dnNewToDo = document.createElement("div");
            dnNewToDo.classList += "todoCard";
            dnNewToDo.setAttribute("index", ToDo.index);

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
    }
    , refreshListOfToDos : function(lsOfToDos){
        viewHandler.clearListOfTodos();
        lsOfToDos.forEach((ToDo)=>{
            viewHandler.renderToDoCard(ToDo);
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
            viewHandler.initializeDoneListeners();
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
    , removeToDo : function(index){
        ToDoModel.lsToDos.splice(index, 1);
        viewHandler.refreshListOfToDos(ToDoModel.lsToDos);
        localStorage.setItem("ToDoList", JSON.stringify(ToDoModel.lsToDos));
    }

}

var ToDoModel = {
    lsToDos : []
    , addToDo : function (strTitle, strContent, strResponsible, dueDate, timeEstimate) {
        intIndex = ToDoModel.lsToDos.length;
        var newToDo = new ToDo(intIndex, strTitle, strContent, strResponsible, dueDate, timeEstimate);
        ToDoModel.lsToDos.push(newToDo);
        viewHandler.refreshListOfToDos(ToDoModel.lsToDos);
        localStorage.setItem("ToDoList", JSON.stringify(ToDoModel.lsToDos));
    }
    , filterListOfToDosByDate : function(date){
        
    }
    , filterListOfToDosByResponsible : function(strResponsible){

    }
    , filterListOfToDosByStatus : function(statusIdenitifier){

    }
}

class ToDo {
    constructor(intIndex, strTitle, strContent, strResponsible, dueDate, timeEstimate){
        this.index = intIndex;
        this.title = strTitle;
        this.content = strContent;
        this.responsible = strResponsible;
        this.dueDate = dueDate;
        this.timeEstimate = timeEstimate;
    }
}

function init(){
    if (localStorage.getItem("ToDoList")){
        if(localStorage.getItem("ToDoList").length <= 1){
            ToDoModel.lsToDos.push(JSON.parse(localStorage.getItem("ToDoList")));
            viewHandler.refreshListOfToDos(ToDoModel.lsToDos);
        } else {
            ToDoModel.lsToDos = JSON.parse(localStorage.getItem("ToDoList"));
            viewHandler.refreshListOfToDos(ToDoModel.lsToDos);
        }
    }
    viewHandler.initEventListeners();
}