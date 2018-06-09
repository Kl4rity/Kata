var popupView = {
    clearAddToDoFormContent : function(){
        document.getElementById("addToDoTitle").value = "";
        document.getElementById("addToDoContent").value = "";
        document.getElementById("addToDoResponsible").value = "";
        document.getElementById("addToDoDueDate").value = "";
        document.getElementById("addToDoEstimate").value = "";
    }
    , fetchFormData : function(){

        objFormData = {
            title : document.getElementById("addToDoTitle").value
            , content : document.getElementById("addToDoContent").value
            , responsible : document.getElementById("addToDoResponsible").value
            , dueDate : document.getElementById("addToDoDueDate").value
            , timeEstimate : document.getElementById("addToDoEstimate").value
        }

        return objFormData;
    }
}