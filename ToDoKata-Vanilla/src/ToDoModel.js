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

var ToDoModel = {
    lsToDos : []
    , addToDo : function (objData) {
        maxIndex = 0;
        ToDoModel.lsToDos.forEach((ToDo) => {
            if (ToDo.index > maxIndex){
                maxIndex = ToDo.index;
            }
        });
        var newToDo = new ToDo((maxIndex+1), objData.title, objData.content, objData.responsible, objData.dueDate, objData.timeEstimate);
        ToDoModel.lsToDos.push(newToDo);
        localStorage.setItem("ToDoList", JSON.stringify(ToDoModel.lsToDos));
        return ToDoModel.lsToDos;
    }
    , removeToDo : function(index){

        matchingToDo = null;

        ToDoModel.lsToDos.forEach((ToDo)=>{
            if(ToDo.index == index){
                matchingToDo = ToDo;
            }
        });
        ToDoModel.lsToDos.splice(ToDoModel.lsToDos.indexOf(matchingToDo), 1);
        localStorage.setItem("ToDoList", JSON.stringify(ToDoModel.lsToDos));
        return ToDoModel.lsToDos;
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
        return filteredList;
    }
    , filterListOfToDosByResponsible : function(strResponsible){
        filteredList = ToDoModel.lsToDos.filter(function(ToDo){
            if(ToDo.responsible == strResponsible){
                return true;
            } else {
                return false;
            }
        });
        return filteredList;
    }
    , getListOfResponsibles : function() {
        lsResponsibles = [];
        ToDoModel.lsToDos.forEach(function(ToDo){
            if (lsResponsibles.indexOf(ToDo.responsible) < 0){
                lsResponsibles.push(ToDo.responsible);
            }
        });
        return lsResponsibles;
    }
    , laodDataFromLocalStorage : function(){
        if (localStorage.getItem("ToDoList")){
            if(localStorage.getItem("ToDoList").length <= 1){
                ToDoModel.lsToDos.push(JSON.parse(localStorage.getItem("ToDoList")));
            } else {
                ToDoModel.lsToDos = JSON.parse(localStorage.getItem("ToDoList"));
            }
        }
        return ToDoModel.lsToDos;
    }
    , validateData : function(objData){

        var boolDataValid = true;

        if (objData.title == null || objData.content == null || objData.responsible == null || objData.dueDate == null || objData.timeEstimate == null) {
            boolDataValid = false;
        }

        return boolDataValid;
    }
}