window.addEventListener("load", init, false);

var viewHandler = {
    initEventListeners : function () {
        document.getElementById("filterByToday").addEventListener("click", ()=>{
            console.log("Filter by today");
            ToDoModel.filterListOfToDosByDate(1);
        });
        document.getElementById("filterByWeek").addEventListener("click", ()=>{
            console.log("Filter by this week");
            ToDoModel.filterListOfToDosByDate(7);
        });
        document.getElementById("filterByMonth").addEventListener("click", ()=>{
            console.log("Filter by this month");
            ToDoModel.filterListOfToDosByDate(30);
        });
        document.getElementById("clearFilters").addEventListener("click", ()=>{
            console.log("Clear Filters");
            viewHandler.refreshListOfToDos(ToDoModel.lsToDos);
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
        viewHandler.populateResponsibleSidebar(viewHandler.buildResponsiblesList());
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
        viewHandler.populateResponsibleSidebar(viewHandler.buildResponsiblesList());

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
        lsResponsibles = [];
        ToDoModel.lsToDos.forEach(function(ToDo){
            if (lsResponsibles.indexOf(ToDo.responsible) < 0){
                lsResponsibles.push(ToDo.responsible);
            }
        });
        return lsResponsibles;
    }
    , populateResponsibleSidebar : function(lsResponsibles){
        viewHandler.clearResponsibleSidebar();
        dnResponsibleSidebar = document.getElementById("responsiblePeople");
        lsResponsibles.forEach(function(responsible){
            newResponsible = document.createElement("li");
            newResponsible.innerHTML = responsible;
            newResponsible.addEventListener("click", function(e){
                ToDoModel.filterListOfToDosByResponsible(e.target.innerHTML);
            });
            dnResponsibleSidebar.appendChild(newResponsible);
        });
    }
    , clearResponsibleSidebar : function(){
        dnResponsibleSidebar = document.getElementById("responsiblePeople");
        while(dnResponsibleSidebar.firstChild) {
            dnResponsibleSidebar.removeChild(dnResponsibleSidebar.firstChild);
        }
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
    , filterListOfToDosByDate : function(daysFromNow){
        filterDate = new Date(Date.now());
        filterDate.setDate(filterDate.getDate() + daysFromNow);
        var filteredList = ToDoModel.lsToDos.filter(function(entry){
            entryDueDate = new Date(entry.dueDate);
            if (entryDueDate < filterDate){
                return true;
            } else {
                return false;
            }
        });
        viewHandler.refreshListOfToDos(filteredList);
    }
    , filterListOfToDosByResponsible : function(strResponsible){
        filteredList = ToDoModel.lsToDos.filter(function(ToDo){
            if(ToDo.responsible == strResponsible){
                return true;
            } else {
                return false;
            }
        });
        viewHandler.refreshListOfToDos(filteredList);
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