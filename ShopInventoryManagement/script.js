const  itemNameInput = document.getElementById('item_name');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');


// Check if local storage has any entries, else set to empty array
let container = JSON.parse(localStorage.getItem("container")) || [];

// Render the list of entries on page load
function renderEntries() {
    let html = "";
    container.forEach((entry, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.itemName}</td>
                <td>${entry.category}</td>
                <td>${entry.quantity}</td>
                <td>${entry.price}</td>
                <td><button onclick="deleteEntry(${index})" type="button" class="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>
        `;
    });
    document.getElementById("container").innerHTML = html;
}

renderEntries();

// Function to add new entry to local storage
function addEntry() {
    const itemName = itemNameInput.value;
    const category = categoryInput.value;
    const quantity = quantityInput.value;
    const price = priceInput.value;


    // Generate ID based on length of entry list
    let id = container.length + 1;

    // Add new entry to list
    container.push({itemName, category, quantity, price});

    // Update local storage with new entry list
    localStorage.setItem("container", JSON.stringify(container));

    // Clear form fields and show success message
    itemNameInput.value = '';
    categoryInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
    // document.getElementById("success").innerHTML = "Data added successfully";
    // alert("Data added successfully")
    // Render updated list of entries
    renderEntries();
}

function deleteEntry(index) {
    // Remove entry at specified index from list
    container.splice(index, 1);

    // Update local storage with updated entry list
    localStorage.setItem("container", JSON.stringify(container));

    // Show success message and render updated list of entries
    // alert("Data deleted successfully");
    renderEntries();
}


// Function to start selling
const billBtn = document.getElementById("bill");
const itemnameToSellInput = document.getElementById("itemnameToSell");
const quantityToSellInput = document.getElementById("quantityToSell");
const resetBtn = document.getElementById("reset");
billBtn.addEventListener("click", ()=>{
    let name = itemnameToSellInput.value;
    let qty = quantityToSellInput.value;
    let ans = 0;

    container.forEach(e =>{
        if(e.itemName === name && qty <= e.quantity)
        {
            ans = e.price * qty;
           e.quantity = e.quantity - qty;
        }else{
            alert("Out Of Stock !!");
        }
    })
    localStorage.setItem("container", JSON.stringify(container));
    renderEntries();
    document.getElementById("totalBill").innerHTML = ans;

    resetBtn.addEventListener("click", ()=>{
        itemnameToSellInput.value='';
        quantityToSellInput.value ='';
        document.getElementById("totalBill").innerHTML ='';
    })
    
})