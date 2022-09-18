import { apiUrl } from './settings.js';

// // Create a new user
// // // {
// //   "id": 1,
// //   "name": "Lee Garrit",
// //   "emailAddress": "lgarrit0@latimes.com",
// //   "address": "9 Eagan Pass"
// // }

// await fetch(`${apiUrl}users`, {
//   method: 'POST',
//   body: JSON.stringify ({"name": "Pásztor Petra","emailAddress": "lgarrit0@latimes.com","address": "9 Eagan Pass"}),
//   headers: {
//     'Content-type': 'application/json',
//   },
// });


// //Get all users
// const response = await fetch (`${apiUrl}users`);
// const userList = await response.json();
// console.log(userList);


//START
//GET data from the server

function getServerData (url) {
  let fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  };
  return fetch(url, fetchOptions).then(
    response => response.json(),
    err => console.error(err)
  );
}

function getUsers() {
getServerData(apiUrl).then(
  data => fillDataTable(data, "userTable")
  );
}

getUsers();

//Fill table with server data 
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
      console.error(`Table "${tableID}" is not found.`);
      return;
    }

    // Add new user row to the table
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = "";
    let newRow = newUserRow();
    tBody.appendChild(newRow);

    for (let row of data) {
      let tr = createAnyElement("tr");
      for (let k in row) {
        let td = createAnyElement("td");
        td.textContent = row[k];            //innerHTML
        tr.appendChild(td);
      }
      let btnGroup = createBtnGroup();
      tr.appendChild(btnGroup);
      tBody.appendChild(tr);
    }
}

function createAnyElement(name, attributes) {
  let element = document.createElement(name);
  for (let k in attributes) {
    element.setAttribute(k, attributes[k]);
  };
  return element;
}


// Create buttons 
function createBtnGroup() {
  let group = createAnyElement("div", {class: "btn btn-group"});
  let editBtn = createAnyElement("button", {class: "btn btn-edit", onclick:"editUser(this)"});
  editBtn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  let delBtn = createAnyElement("button", {class: "btn btn-delete", onclick:"deleteUser(this)"});
  delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  
  group.appendChild(editBtn);
  group.appendChild(delBtn);

  let td = createAnyElement("td");
  td.appendChild(group);
  
  return td;
}

// Delete button  
function deleteUser(btn) {
  let tr = btn.parentElement.parentElement.parentElement;
  let id = tr.querySelector("td:first-child").innerHTML;
  let fetchOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache"
  };

  fetch(`${apiUrl}/${id}`, fetchOptions).then(
    resp => resp.json(),
    err => console.error(err)
  ).then(
    data => {
      getUsers();
    }
  );
};

// Create new user
function newUserRow (row) {
  let tr = createAnyElement("tr");
  for (let k in {id:'', name:'', email:'', address:''}) {
    let td = createAnyElement("td");
    let input = createAnyElement("input", {
      class: "input",
      name: k
    });
    td.appendChild(input);
    tr.appendChild(td);
  }
  let newBtn = createAnyElement("button", {
    class: "btn btn-new",
    onclick: "createUser(this)"
  });
  newBtn.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
  let td = createAnyElement("td");
  td.appendChild(newBtn);
  tr.appendChild(td);

  return tr;
}

function createUser(btn) {
  let tr = btn.parentElement.parentElement;
  let data = getRowData(tr);
  delete data.id;
  let fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(`${apiUrl}`, fetchOptions).then(
    resp => resp.json(),
    error => console.error(error)
  ).then(
    data => getUsers()
  );
};

function getRowData(tr) {
  let inputs = tr.querySelectorAll('input');
  let data = {};
  for (let i = 0; i<inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  return data;
}






