"use strict";

import { refs } from "../general/refs";
import * as clickHandler from '../general/clickHandler';

// getUserByQuery({ login: "qw@qw.qw", id: 13 });

// Create a feedback
export function createFeedback(obj) {
  fetch(refs.backEnd.apiUrl + refs.backEnd.feedBack, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Cannot create a feedback record");
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error));
}

// Create a user
export function createUser(obj) {
  fetch(refs.backEnd.apiUrl + refs.backEnd.users, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Cannot add user");
      return response.json();
    })
    .then(data => {
      clickHandler.handleUserActions(data, "loggingIn");
    })
    .catch(error => console.log(error));
}

// Get all users
export function getUsers(event) {
  event.preventDefault();
  fetch(refs.backEnd.apiUrl + refs.backEnd.users)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    .then(data => console.log(data))
    .catch(error => console.log("User not found! " + error));
}

// Get user by id
export function getUserByQuery(queryObj, state) {
  //queryObj -> queryString
  let queryString = "?";
  for (const prop in queryObj) {
    queryString += `${prop}=${queryObj[prop]}&`;
  }
  return fetch(refs.backEnd.apiUrl + refs.backEnd.users + queryString)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    .then(data => {
      clickHandler.handleUserActions(data, state)
    })
    .catch(error => console.log("User not found! " + error));
}

// Delete user
export function removeUser(id) {
  fetch(refs.backEnd.apiUrl + refs.backEnd.users + id, { method: "DELETE" })
    .then(response => {
      if (!response.ok) throw new Error("Cannot delete user");
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

// Send a feedback form
export function sendFeedBack(obj) {
  fetch(refs.backEnd.apiUrl + refs.backEnd.feedBack, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Cannot add user");
      return response.json();
    })
    .then(alert("Thank you for your feedback!"))
    .catch(error => console.log(error));
}

// const API_URL = 'https://test-users-api.herokuapp.com/users/';
// const refs = {
//   showAllBtn: document.querySelector('[data-action="showAll"]'),
//   result: document.querySelector('.result'),
//   idSpecific: document.querySelector('.id-specific'),
//   addNew: document.querySelector('[data-action="addNew"]'),
//   userName: document.querySelector('.name'),
//   userAge: document.querySelector('.age'),
//   userId: document.querySelector('.id'),
//   updateBtn: null,
//   removeBtn: null,
// };
// refs.idSpecific.addEventListener('input', changeBtnTitle);
// refs.showAllBtn.addEventListener('click', getAllUsersOrById);
// refs.addNew.addEventListener('click', addUser);

// //Creates / Updates user. Triggers viewUsersInTable
// function addUser(ev) {
//   ev.preventDefault();
//   const uName = refs.userName.value.trim();
//   const uAge = +refs.userAge.value.trim();
//   const userCredentials = { name: uName, age: uAge };
//   //Update
//   if (refs.userId.value) {
//     if (!uName || !uAge) return;
//     fetch(`${API_URL}${refs.userId.value}`, {
//       method: 'PUT',
//       body: JSON.stringify(userCredentials),
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(resp => resp.json())
//       .then(data => viewUsersInTable(data.data))
//       .catch(err => console.log(err));
//   } else {

//     //Create
//     fetch(API_URL, {
//       method: 'POST',
//       body: JSON.stringify(userCredentials),
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         if (!response.ok) throw new Error('Cannot add user');
//         return response.json();
//       })
//       .then(data => {
//         viewUsersInTable(data.data);
//       })
//       .catch(error => console.log(error));
//   }
// }

// // Changes first button's title depending on whether there if an ID psecified by user or not
// function changeBtnTitle() {
//   if (refs.idSpecific.value) {
//     refs.showAllBtn.textContent = 'Show user by ID';
//   } else {
//     refs.showAllBtn.textContent = 'Show all users';
//   }
// }

// //Reads data: all or specific. Triggers viewUsersInTable
// function getAllUsersOrById(ev) {
//   ev.preventDefault();
//   fetch(`${API_URL}${refs.idSpecific.value}`)
//     .then(response => {
//       if (response.ok) return response.json();
//       throw new Error(`Error when fetching data: ${response.statusText}`);
//     })
//     .then(data => viewUsersInTable(data['data']))
//     .catch(error => console.log('User not found! ' + error));
// }

// //Displays search result into a table. Hangs eventListener for updateUser and removeUser
// function viewUsersInTable(obj) {
//   let tableBegin =
//     '<table><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Controls</th></tr></thead><tbody>';
//   const tableEnd = '</tbody></table>';
//   let newArr = [];

//   if (obj instanceof Array) {
//     newArr = obj;
//   } else {
//     // Якщо fetch поверне 1 елемент, то на ньому map не спрацює. Обертаємо в масив
//     newArr.push(obj);
//   }
//   newArr.map(el => {
//     tableBegin += `<tr><td>${el.id || el._id}</td><td>${el.name}</td><td>${
//       el.age
//     }</td><td><button class="button" data-action="upd">Update</button><button class="button" data-action="rem">Remove</button></td></tr>`;
//   });
//   refs.result.innerHTML = tableBegin + tableEnd;

//   refs.updateBtn = refs.result.querySelectorAll('[data-action="upd"]');
//   refs.removeBtn = refs.result.querySelectorAll('[data-action="rem"]');
//   Array.from(refs.removeBtn).map(btn =>
//     btn.addEventListener('click', removeUser),
//   );
//   Array.from(refs.updateBtn).map(btn =>
//     btn.addEventListener('click', updateUser),
//   );
//   init();
// }

// //Deletes user
// function removeUser(event) {
//   event.preventDefault();
//   const tr = event.target.closest('tr');
//   const id = tr.firstElementChild.textContent;
//   fetch(`${API_URL}${id}`, { method: 'DELETE' })
//     .then(response => {
//       if (!response.ok) throw new Error('Cannot delete');
//       tr.remove();
//     })
//     .catch(error => console.log(error));
// }

// //Updates user credentials
// function updateUser() {
//   const tr = event.target.closest('tr');
//   const id = tr.firstElementChild.textContent;
//   refs.addNew.textContent = 'Update user credentials';
//   refs.userName.value = tr.querySelector(':nth-child(2)').textContent;
//   refs.userAge.value = tr.querySelector(':nth-child(3)').textContent;
//   refs.userId.value = tr.querySelector(':nth-child(1)').textContent;
// }

// function init() {
//   refs.userId.value = "";
//   refs.userName.value = "";
//   refs.userAge.value = "";
//   refs.addNew.textContent = '+ Add new user';

// }
