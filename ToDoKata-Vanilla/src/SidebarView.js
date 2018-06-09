var sidebarView = {
    populateResponsibleSidebar : function(lsResponsibles){
        sidebarView.clearResponsibleSidebar();
        dnResponsibleSidebar = document.getElementById("responsiblePeople");
        lsResponsibles.forEach(function(responsible){
            newResponsible = document.createElement("li");
            newResponsible.classList += "responsible";
            newResponsible.innerHTML = responsible;
            newResponsible.addEventListener("click", Controller.initializeFilterByResponsibleListeners);
            dnResponsibleSidebar.appendChild(newResponsible);
        });
    }
    , clearResponsibleSidebar : function(){
        dnResponsibleSidebar = document.getElementById("responsiblePeople");
        while(dnResponsibleSidebar.firstChild) {
            dnResponsibleSidebar.removeChild(dnResponsibleSidebar.firstChild);
        }
    }
}