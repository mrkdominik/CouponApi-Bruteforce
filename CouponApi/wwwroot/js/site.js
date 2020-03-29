// <snippet_SiteJs>
const uri = 'api/CouponItems';
let Coupons = [];

function getItems() {
// <snippet_GetItems>
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
// </snippet_GetItems>
}

// <snippet_AddItem>
function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addCodeTextbox = document.getElementById('add-code');

  const item = {
      name: addNameTextbox.value.trim(),
      code: addCodeTextbox.value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
        addNameTextbox.value = '';
        addCodeTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}
// </snippet_AddItem>

function deleteItem(id) {
  // <snippet_DeleteItem>
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
  // </snippet_DeleteItem>
}

function displayEditForm(id) {
    const item = Coupons.find(item => item.id === id);

  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-code').value = item.code;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    name: document.getElementById('edit-name').value.trim(),
    code: document.getElementById('edit-code').value.trim()
  };

  // <snippet_UpdateItem>
  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));
  // </snippet_UpdateItem>

  closeInput();

  return false;
}

function closeInput() {
    $('#myModal').modal('hide'); 
}

function _displayCount(itemCount) {
  const name = itemCount === 1 ? 'coupon' : 'coupons';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('Coupons');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
      editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
      editButton.setAttribute('class', 'btn btn-secondary btn-sm');
      editButton.setAttribute('data-toggle', 'modal');
      editButton.setAttribute('data-target', '#myModal');

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
      deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
      deleteButton.setAttribute('class', 'btn btn-secondary btn-sm');


    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    let textNode = document.createTextNode(item.name);
    td1.appendChild(textNode);

    let td2 = tr.insertCell(1);
    let textNode2 = document.createTextNode(item.code);
    td2.appendChild(textNode2);

      if (item.win === true) { 
          td1.style.backgroundColor = "green";   
          td2.style.backgroundColor = "green";      
      }

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  Coupons = data;
}
// </snippet_SiteJs>

// <snippet_Loader>
var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 2000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
// </snippet_Loader>
