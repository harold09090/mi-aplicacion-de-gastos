const form = document.getElementById("transactionForm");
    form.addEventListener("submit", function(event){
event.preventDefault();
let transactionFormData = new FormData(form);
let transactionObj= convertFormaDataToTransactionObj(transactionFormData)
saveTranctionObj(transactionObj)
insertRowInTransactionTable(transactionObj)
form.reset();
})
document.addEventListener("DOMContentLoaded", function(event) {
    draw_category()
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))  
 transactionObjArr.forEach(
    function(arrayElement){
        insertRowInTransactionTable(arrayElement)
        
       // console.log(" se inserta el elemento")

        


    }
 ) 
})
function draw_category(){

let allCategories=["Alquiler", "Comida", "Diversion", "Antojo", "Gasto", "Transporte"]
for(let index =0; index< allCategories.length; index++){
    insertCategory(allCategories[index])
}

}

function insertCategory(categoryName) {
    const selectElement = document.getElementById("transationCategory");

    let htmlToInsert = `<option>${categoryName}</option>`;
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
}





    function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
    return newTransactionId;
}


function convertFormaDataToTransactionObj(transactionFormData){
let transactionType = transactionFormData.get("transactionType")
let transationDescription  = transactionFormData.get("transationDescription")
let transationAmount = transactionFormData.get("transationAmount")
let transationCategory = transactionFormData.get("transationCategory")
let transactionId = getNewTransactionId();
return {
    "transactionType":transactionType,
    "transationDescription":transationDescription,
    "transationAmount":transationAmount,
    "transationCategory":transationCategory,
    "transactionId":transactionId

}
}

function insertRowInTransactionTable(transactionObj) {
   let transactionTableRef = document.getElementById("transactionTable");
   let newTransactionRowRef = transactionTableRef.insertRow(-1);
    
    newTransactionRowRef.setAttribute("data-transaction-Id", transactionObj.transactionId); // Agrega el atributo

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionObj["transactionType"];

    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObj["transationDescription"];

    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactionObj["transationAmount"];

    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactionObj["transationCategory"];

    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        
        let transactionRow = event.target.parentNode.parentNode;
        let transactionId = transactionRow.getAttribute("data-transaction-Id");
        transactionRow.remove();
        deleteTransactionObj(transactionId);
    });
}

function deleteTransactionObj(transactionId){
    //obtengo mi transacccion de mi base de datos (desconvierto de json a objeto)
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
    //busco el indice / la posicion de la transaccion que quiero eliminar
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId == transactionId);
    //elimino el elemento en la posisicon
    transactionObjArr.splice(transactionIndexInArray, 1);
    //convierto a json
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    //guardo mi array de transacion en formato jsaon en el  local storege
    localStorage.setItem("transactionData", transactionArrayJSON)
}

function saveTranctionObj(transactionObj){
let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
myTransactionArray.push(transactionObj);
let transactionArrayJSON = JSON.stringify(myTransactionArray)
localStorage.setItem("transactionData", transactionArrayJSON)
}