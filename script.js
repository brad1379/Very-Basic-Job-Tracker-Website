/**
 * Sorts an HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort 
 * @param {boolean} asc Determines if the sorting will be in ascending order 
 */

function sortTableByColumn(table,column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });
    // console.log(sortedRows);

    // Remove all existing rows from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how column is currently sorted.
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

function addJobToTable(){
    const posField = document.getElementById("posEl");
    const compField = document.getElementById("compEl");
    const locField = document.getElementById("locEl");
    const date = new Date();

    // getting the current data from the Date() object
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let currentDate = `${month}/${day}/${year}`;
    
    var table = document.getElementById("myTable"),
        rows = table.getElementsByTagName("tr");
    
    // Error checking to make sure all form fields are filled out before submitting 
    if (compField.value && locField.value && !posField.value){
        posField.focus();
    } 
    else if (posField.value && locField.value && !compField.value) {
        compField.focus();
    }
    else if (posField.value && compField.value && !locField.value) {
        locField.focus();
    }
    else if (posField.value && !compField.value && !locField.value) {
        compField.focus();
    }
    else if (!posField.value && compField.value && !locField.value) {
        posField.focus();
    }
    else if (!posField.value && !compField.value && locField.value) {
        posField.focus();
    }
    else {
        var row = table.insertRow(-1);
        var num = row.insertCell(0);
        var tdDate = row.insertCell(1);
        var pos = row.insertCell(2);
        var comp = row.insertCell(3);
        var loc = row.insertCell(4);
    }
    
    // Assign the text box values along with the row number and current date to the cells in the newly added row
    num.innerHTML = rows.length-1;
    tdDate.innerHTML = currentDate;
    pos.innerHTML = posField.value;
    comp.innerHTML = compField.value;
    loc.innerHTML = locField.value;

    // Clear out text boxes for next submission
    posField.value = "";
    compField.value = "";
    locField.value = "";
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () =>{
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    })
})