import * as api from "../api/api";
import * as hbs from "./hbs";
import debounce from "../general/debounce";
import '@babel/polyfill';

export function composeStartDebounced(evt) {
  const debouncedFilter = debounce(300, composeStart);
  debouncedFilter(evt);
}

export function composeStart(evt) {
  if (evt.target.nodeName !== "INPUT") return;
  const type = document.querySelector("input[name='admin-viewMethod']:checked")
    .value;
  let filterObject = {};
  const skill =
    document.querySelector("#user-stack").value.toLowerCase() || null;
  const minSalary = document.querySelector("#user-salary").value || null;
  let location = null;
  if (
    document.querySelector("input[name='user-location']:checked").value !==
    "null"
  ) {
    location = document.querySelector("input[name='user-location']:checked")
      .value;
  }
  const updatedSince = document.querySelector("#user-update").value || null;
  const date = document.querySelector("#feedback-date").value || null;
  if (type === "users") {
    filterObject = {
      skill: skill,
      minSalary: minSalary,
      updatedSince: updatedSince,
      location: location
    };
  }
  if (type === "feedBack") {
    filterObject = {
      date: date
    };
  }
  for (let prop in filterObject) {
    if (filterObject[prop] === null) {
      delete filterObject[prop];
    }
  }
  filterStart(filterObject, type);
}

export function filterStart(filters, type) {
  if (type === "users") {
    api
      .getUsers()
      .then(data => filtering(data, filters, type))
      .then(data => fieldsToShow(data, type))
      .then(data => hbs.createTable(data, type))
      .catch(error => console.log("Problem with filtering! " + error));
  }
  if (type === "feedBack") {
    api
      .getFeedbackResponses()
      .then(data => filtering(data, filters, type))
      .then(data => fieldsToShow(data, type))
      .then(data => hbs.createTable(data, type))
      .catch(error => console.log("Problem with filtering! " + error));
  }
}

function filtering(objectsArray, filters, type) {
  let filteredArray = objectsArray;

  //deleting admins
  filteredArray = filteredArray.filter(el => !el._admin);
  if ("location" in filters) {
    filteredArray = filteredArray.filter(
      el => el.location === filters.location
    );
  }

  if ("minSalary" in filters) {
    filteredArray = filteredArray.filter(el => {
      return parseFloat(el.salary, 10) > parseFloat(filters.minSalary, 10);
    });
  }
  
  if ("skill" in filters) {
    filteredArray = filteredArray.filter(el =>
      el.skills.some(sk => sk.skill.indexOf(filters.skill) > -1)
    );
  }

  if ("updatedSince" in filters) {
    filteredArray = filteredArray.filter(el => {
      const objDate = stringToDate(el.updateDate);
      const filterDate = stringToDate(filters.updatedSince);
      return objDate >= filterDate;
    });
  }

  if ("date" in filters) {
    filteredArray = filteredArray.filter(el => {
      const objDate = stringToDate(el.date);
      const filterDate = stringToDate(filters.date);
      return objDate >= filterDate;
    });
  }
  sessionStorage.setItem("fullData", JSON.stringify(filteredArray));
  return filteredArray;
}

function stringToDate(str) {
  if (str.search("-") > -1) {
    const objArrayDate = str.split("-");
    return new Date(objArrayDate[0], objArrayDate[1] - 1, objArrayDate[2]);
  }
  const objArrayDate = str.split("/");
  return new Date(objArrayDate[2], objArrayDate[1] - 1, objArrayDate[0]);
}

function fieldsToShow(arr, type) {
  let toShow = [];
  if (type === "users") {
    toShow = arr.map(el => {
      const obj = {};
      obj.id = el.id;
      obj.salary = el.salary;
      obj.location = el.location;
      obj.skills = el.skills;
      obj.updateDate = el.updateDate;
      return obj;
    });
  }
  if (type === "feedBack") {
    toShow = arr.map(el => {
      const obj = {};
      obj.id = el.id;
      obj.name = el.name;
      obj.text = el.text;
      obj.date = el.date;
      return obj;
    });
  }
  sessionStorage.setItem("filteredData", JSON.stringify(toShow));
  return toShow;
}
