var todoListView = {
    renderToDoCard : function(ToDo){
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

            return dnNewToDo;
    }
    , buildListOfTodos : function(lsOfToDos){
        dnToDoListMainView = document.getElementById("mainView");
        todoListView.clearListOfTodos();
        lsOfToDos.forEach((ToDo)=>{
            dnToDoListMainView.appendChild(todoListView.renderToDoCard(ToDo));
        });
    }
    , clearListOfTodos : function(){
        dnToDoListMainView = document.getElementById("mainView");
        while(dnToDoListMainView.firstChild) {
            dnToDoListMainView.removeChild(dnToDoListMainView.firstChild);
        }
    }
}