import { apiUrl } from './settings.js';

// Create a new user
// // {
//   "id": 1,
//   "name": "Lee Garrit",
//   "emailAddress": "lgarrit0@latimes.com",
//   "address": "9 Eagan Pass"
// }

await fetch(`${apiUrl}users`, {
  method: 'POST',
  body: JSON.stringify ({"name": "Pásztor Petra","emailAddress": "lgarrit0@latimes.com","address": "9 Eagan Pass"}),
  headers: {
    'Content-type': 'application/json',
  },
});


//Get all users
const response = await fetch (`${apiUrl}users`);
const userList = await response.json();
console.log(userList);


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

getServerData(apiUrl).then(
  data => fillDataTable(data, "userTable")
);

//Fill table with server data 
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
      console.error(`Table "${tableID}" is not found.`);
      return;
    }
    let tBody = table.querySelector("tbody");
    for (let row of data) {
      let tr = createAnyElement("tr");
      for (let k in row) {
        let td = createAnyElement("td");
        td.textContent = row[k];            //innerHTML
        tr.appendChild(td);
      }
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

