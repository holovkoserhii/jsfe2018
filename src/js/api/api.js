"use strict";

import { refs } from "../general/refs";
import * as clickHandler from "../general/clickHandler";
import * as hbs from "../personal/hbs";

// Create a feedback
// export function createFeedback(obj) {
//   console.log(obj);
//   obj.date = `${new Date().getDate()}/${new Date().getMonth() +
//     1}/${new Date().getFullYear()}`;
//     console.log(obj);
//   fetch(refs.backEnd.apiUrl + refs.backEnd.feedBack, {
//     method: "POST",
//     body: JSON.stringify(obj),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => {
//       if (!response.ok) throw new Error("Cannot create a feedback record");
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => console.log(error));
// }

// Create a user
export function createUser(obj) {
  console.log("in a create user function");
  console.log(obj);
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
      const newArr = [];
      if (!(data instanceof Array)) {
        newArr.push(data);
      } else {
        newArr = data;
      }
      clickHandler.handleUserActions(newArr, "loggingIn");
    })
    .catch(error => console.log(error));
}

// Get all users
export function getUsers() {
  // if(event) event.preventDefault();
  return fetch(refs.backEnd.apiUrl + refs.backEnd.users)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    // .then(data => console.log(data))
    .catch(error => console.log("User not found! " + error));
}

// Get user by query
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
      clickHandler.handleUserActions(data, state);
    })
    .catch(error => console.log("User not found! " + error));
}

// Get user by id
export function getUserById(id) {
  let queryString = `?id=${id}`;
  return fetch(refs.backEnd.apiUrl + refs.backEnd.users + queryString)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    .catch(error => console.log("User not found! " + error));
}

// Delete user
export function removeUser({id}) {
  return fetch(refs.backEnd.apiUrl + refs.backEnd.users + id, { method: "DELETE" })
    .then(response => {
      if (!response.ok) throw new Error("Cannot delete user");
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

// Send a feedback form
export function sendFeedBack(obj) {
  obj.date = `${new Date().getDate()}/${new Date().getMonth() +
    1}/${new Date().getFullYear()}`;
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

// Get all feedback
export function getFeedbackResponses() {
  return fetch(refs.backEnd.apiUrl + refs.backEnd.feedBack)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    .catch(error => console.log("Feedback not found! " + error));
}

//update user
export function updateUser(id, objWithChanges) {
  objWithChanges.updateDate = `${new Date().getDate()}/${new Date().getMonth() +
    1}/${new Date().getFullYear()}`;
  return fetch(refs.backEnd.apiUrl + refs.backEnd.users + id, {
    method: "PATCH",
    body: JSON.stringify(objWithChanges),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("Cannot make changes");
      return response.json();
    })
    .catch(error => console.log(error));
}

// get suitable skills list
export function getSkills(input) {
  return fetch(refs.backEnd.apiUrl + refs.backEnd.hardSkills)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    .then(data => {
      return data.filter(el => el.includes(input));
    })
    .then(data => {
      if (data.length > 15) {
        return data.slice(0, 15);
      }
      return data;
    })
    .catch(error => console.log("skills not found! " + error));
}
