window.addEventListener("load", init, false);

var Controller = {
    initEventListeners : function () {
        document.getElementById("filterByToday").addEventListener("click", ()=>{
            console.log("filter 1");
            Controller.refreshApp(ToDoModel.filterListOfToDosByDate(1));
        });
        document.getElementById("filterByWeek").addEventListener("click", ()=>{
            console.log("filter 7");
            Controller.refreshApp(ToDoModel.filterListOfToDosByDate(7));
        });
        document.getElementById("filterByMonth").addEventListener("click", ()=>{
            console.log("filter 30");
            Controller.refreshApp(ToDoModel.filterListOfToDosByDate(30));
        });
        document.getElementById("clearFilters").addEventListener("click", ()=>{
            console.log("CLEAR");
            Controller.refreshApp(ToDoModel.lsToDos);
        });
        document.getElementById("addTodo").addEventListener("click", ()=>{
            document.getElementById("addToDoOverlay").setAttribute("style", "display: block");
            document.getElementById("addToDoDialogueBox").setAttribute("style", "display: block");
        });
        document.getElementById("addToDoOverlay").addEventListener("click", ()=>{
            document.getElementById("addToDoOverlay").setAttribute("style", "display: none");
            document.getElementById("addToDoDialogueBox").setAttribute("style", "display: none");
            popupView.clearAddToDoFormContent();
        });
        document.getElementById("executeAddToDo").addEventListener("click", ()=>{
            objData = popupView.fetchFormData();

            if(ToDoModel.validateData(objData)){
                Controller.refreshApp(ToDoModel.addToDo(objData))
            }
            popupView.clearAddToDoFormContent();
        });
        Controller.initializeDoneListeners();
        sidebarView.populateResponsibleSidebar(ToDoModel.getListOfResponsibles());
    }
    , initializeDoneListeners : function() {
        var listOfNodes = document.getElementsByClassName("done");
        Array.from(listOfNodes).forEach((dn) => {
            dn.removeEventListener("click", (e)=>{
                console.log(e.target.parentNode.parentNode);
                Controller.refreshApp(
                    ToDoModel.removeToDo(e.target.parentNode.parentNode.getAttribute("index"))
                );
            });
            dn.addEventListener("click", (e)=>{
                console.log(e.target.parentNode.parentNode);
                Controller.refreshApp(
                    ToDoModel.removeToDo(e.target.parentNode.parentNode.getAttribute("index"))
                );
            });
          });
    }
    , initializeFilterByResponsibleListeners : function(){
        var listOfNodes = document.getElementsByClassName("responsible");
        Array.from(listOfNodes).forEach((dn) => {
            dn.removeEventListener("click", (e)=>{
                console.log(e.target.parentNode.parentNode);
                Controller.refreshApp(
                    ToDoModel.filterListOfToDosByResponsible(e.target.innerHTML)
                );
            });
            dn.addEventListener("click", (e)=>{
                console.log(e.target.parentNode.parentNode);
                Controller.refreshApp(
                    ToDoModel.filterListOfToDosByResponsible(e.target.innerHTML)
                );
            });
          });
    }
    , refreshApp : function(lsOfTodos){
        todoListView.buildListOfTodos(lsOfTodos);
        sidebarView.populateResponsibleSidebar(ToDoModel.getListOfResponsibles());
        Controller.initializeDoneListeners();
        Controller.initializeFilterByResponsibleListeners();
    }
}

function init(){
    Controller.initEventListeners();
    ToDoModel.laodDataFromLocalStorage()
    Controller.refreshApp(ToDoModel.lsToDos);
}