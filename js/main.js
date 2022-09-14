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