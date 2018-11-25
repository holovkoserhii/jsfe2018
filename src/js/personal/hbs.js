import * as userTemplateEnglish from "../../templates/user-english.hbs";
import * as userTemplateUkrainian from "../../templates/user-ukrainian.hbs";
import * as adminTemplateEnglish from "../../templates/admin-english.hbs";
import * as adminTemplateUkrainian from "../../templates/admin-ukrainian.hbs";
import { refs } from "../general/refs";
import * as api from "../api/api";
// import debounce from "../general/debounce";
import * as pageLoader from "../general/pageLoader";
import { pager, showOnPage, rewq } from "./paginator";
import * as downloader from "./downloader";

// console.log(userTemplateEnglish);

export function updateUserField(evt) {
  const id = localStorage.getItem("id") || sessionStorage.getItem("id");
  const target = evt.target;
  switch (target) {
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__name"):
      console.log("changing name");
      api.updateUser(id, { name: target.value });
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__telephone"):
      console.log("changing phone");
      api.updateUser(id, { telephone: target.value });
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__location"):
      console.log("changing location");
      api.updateUser(id, { location: target.value });
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__salary"):
      console.log("changing salary");
      api.updateUser(id, { salary: target.value });
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__about"):
      console.log("changing about");
      api.updateUser(id, { about: target.value });
      break;
  }
}

export function findUser() {
  const id = localStorage.getItem("id") || sessionStorage.getItem("id");
  return api
    .getUserById(id)
    .then(data => {
      personalOutlookRender(data[0]);
    })
    .catch(error => console.log("User not found! " + error));
}

export function personalOutlookRender(obj) {
  obj.greeting = getGreeting()[obj.language];
  let markup = "";
  switch (obj.language) {
    case "en":
      if (obj._admin) {
        // adminTemplateEnglish
        markup = adminTemplateEnglish(obj);
      } else {
        // userTemplateEnglish
        obj.coreTable = getCoreTableMarkup(obj);
        markup = userTemplateEnglish(obj);
      }
      refs.loggedIn.loggedInSection.innerHTML = markup;
      break;
    case "ua":
      if (obj._admin) {
        // adminTemplateUkrainian
        markup = adminTemplateUkrainian(obj);
      } else {
        // userTemplateUkrainian
        obj.coreTable = getCoreTableMarkup(obj);
        markup = userTemplateUkrainian(obj);
      }
      refs.loggedIn.loggedInSection.innerHTML = markup;
      break;
  }

  location.href = refs.site.locationLoggedIn;

  if (obj._admin) {
    adminEventsTuning(obj);
  } else {
    userEventsTuning(obj);
  }
}

function adminEventsTuning(obj) {
  //setting event listener to change the language
  document
    .querySelector(".logged-in__language")
    .addEventListener("click", changeLanguage.bind(obj));
}

function userEventsTuning(obj) {
  //setting event listener to change the language
  document
    .querySelector(".logged-in__language")
    .addEventListener("click", changeLanguage.bind(obj));

  //setting event listener to input fields of a personal form
  const inputArray = Array.from(document.querySelectorAll(".logged-in__input"));
  inputArray.forEach(elem => elem.addEventListener("blur", updateUserField));

  //setting event listener to strength progress bar
  document
    .querySelector(".core-skills")
    .addEventListener("click", updatePosition);

  //setting event listener to skills pick text input
  document
    .querySelector(".core-skills")
    .addEventListener("input", skillsPicker.bind(obj));

  //setting event listener to hide hideTextSearchHint
  document
    .querySelector(".core-skills")
    .addEventListener("blur", hideTextSearchHint);

  //setting event listener to pick a skill from a hint list
  document
    .querySelector(".core-skills__search-results")
    .addEventListener("click", skillSelected);

  //setting event listener to send skill + strength to the backend
  document
    .querySelector(".core-skills")
    .addEventListener("click", updateSkills.bind(obj));

  //setting event listener to delete skill + strength
  document
    .querySelector(".core-skills")
    .addEventListener("click", deleteSkill.bind(obj));

  //setting event listener to delete the user
  document
    .querySelector(".logged-in__delete-user")
    .addEventListener("click", deleteUser.bind(obj));
}

function getCoreTableMarkup(obj) {
  const skillsArr = obj.skills;
  const tableBegin = `<table class='core-skills'><caption>${
    obj.language === "ua" ? "Ваші вміння" : "Your skills"
  }</caption><tbody>`;
  return (
    skillsArr.reduce((accum, elem) => {
      return (accum += `<tr><td>${
        elem.skill
      }</td><td><progress class='logged-in__strength' value='${
        elem.level
      }' max='10'></progress></td><td><button>${
        obj.language === "ua" ? "Видалити" : "Remove"
      }</button></td></tr>`);
    }, tableBegin) +
    `<tr class='logged-in__skill-select'><td style='position:relative;'><input id='skill-input' class='logged-in__skill' type='text' placeholder='${
      obj.language === "ua"
        ? "Почніть вводити (англ)..."
        : "Start typing a skill"
    }' /><div class='core-skills__search-results visually-hidden'></div></td><td><progress class='logged-in__strength' value='0' max='10'></progress></td><td></td></tr></tbody></table>`
  );
}

function changeLanguage(evt) {
  this.language === "en" ? (this.language = "ua") : (this.language = "en");
  api
    .updateUser(this.id, { language: this.language })
    .then(() => personalOutlookRender(this))
    .catch(error => console.log(error));
}

function skillsPicker(evt) {
  if (evt.target.nodeName !== "INPUT") return;
  hideTextSearchHint();
  if (evt.target.value.length === 0) return;
  const parentTR = evt.target.closest("tr");
  parentTR.querySelector(".logged-in__strength").value = 0;
  const value = evt.target.value;
  api
    .getSkills(value.toLowerCase())
    .then(data => {
      return data;
    })
    .then(data => {
      const results = document.querySelector(".core-skills__search-results");
      results.classList.remove("visually-hidden");
      if (data.length !== 0) {
        const lisHintMarkup = data.reduce((accum, elem) => {
          return (accum += `<li>${elem}</li>`);
        }, "");
        const fullHintMarkup = `<ul>${lisHintMarkup}</ul>`;
        results.innerHTML = fullHintMarkup;
      } else {
        results.textContent =
          this.language === "ua"
            ? "Немає технологій згідно Вашого запиту"
            : "No skills matching your query";
      }
    })
    .catch(error =>
      console.log("something went wrong with fetching skills! " + error)
    );
}

function hideTextSearchHint() {
  document.querySelector(".core-skills__search-results").innerHTML = "";
  document
    .querySelector(".core-skills__search-results")
    .classList.add("visually-hidden");
}

function skillSelected(evt) {
  if (evt.target.nodeName !== "LI") return;
  document.querySelector(".logged-in__skill").value = evt.target.textContent;
  const parentTR = evt.target.closest("tr");
  parentTR.querySelector(".logged-in__strength").value = 0;
  hideTextSearchHint();
}

function updatePosition(evt) {
  if (evt.target.nodeName !== "PROGRESS") return;
  const xPosition = evt.pageX - evt.target.getBoundingClientRect().left;
  evt.target.value = Math.round(
    xPosition / (evt.target.clientWidth / evt.target.max),
    0
  );
}

function updateSkills(evt) {
  if (evt.target.nodeName !== "PROGRESS") return;
  const parentRow = evt.target.closest("tr");
  const tdCell = parentRow.querySelector("td");
  let skill = "default";
  if (tdCell.querySelector("*")) {
    skill = tdCell.querySelector("input").value;
  } else {
    skill = tdCell.textContent;
  }
  const strength = evt.target.value;
  if (skill === "") return;
  const skillObj = this.skills.find(el => el.skill === skill);
  if (skillObj) {
    skillObj.level = strength;
  } else {
    this.skills.push({
      skill: skill,
      level: strength
    });
  }
  console.log(this.skills);
  api
    .updateUser(this.id, { skills: this.skills })
    .then(() => personalOutlookRender(this))
    .catch(error => console.log(error));
}

function deleteSkill(evt) {
  if (evt.target.nodeName !== "BUTTON") return;
  const skill = evt.target.closest("tr").querySelector("td").textContent;
  const skillObj = this.skills.find(el => el.skill === skill);
  const number = this.skills.indexOf(skillObj);
  this.skills.splice(number, 1);
  api
    .updateUser(this.id, { skills: this.skills })
    .then(() => personalOutlookRender(this))
    .catch(error => console.log(error));
}

function deleteUser(evt) {
  if (evt.target.nodeName !== "BUTTON") return;
  if (
    confirm(
      `${
        this.language === "ua"
          ? "Ви дійсно хочете видалити ваш обліковий запис? Операція незворотня.\nОК - так, видаліть мій акаунт.\nCancel - ні, я передумав. Залиште його"
          : "Do you really want to delete your account? This operation is irreversible.\nOK - Yes, delete my account.\nCancel - I changed my mind, please leave it"
      }`
    )
  ) {
    api
      .removeUser(this)
      .then(() => {
        localStorage.removeItem("id");
        sessionStorage.removeItem("id");
        delete refs.site.registerButtonNav.dataset.content;
        refs.site.registerButtonNav.textContent = "Register";
        pageLoader.siteReady();
      })
      .catch(error => console.log(error));
  }
}

function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 13) {
    if (hours < 6)
      return {
        ua: "Доброї ночі, ",
        en: "Good night, "
      };
    return {
      ua: "Доброго ранку, ",
      en: "Good morning, "
    };
  } else {
    if (hours < 17)
      return {
        ua: "Доброго дня, ",
        en: "Good afternoon, "
      };
    return {
      ua: "Доброго вечора, ",
      en: "Good evening, "
    };
  }
}

///////// For admin

function createTable(arr = null) {
  if (arr) {
    sessionStorage.setItem("data", JSON.stringify(arr));
    const table = dataIntoTable(arr);
    document.querySelector("#dynamic-table").appendChild(table);
    document
      .querySelector("#dynamic-table")
      .addEventListener("click", sortColumn);
    pager(table);
  } else {
    api
      .getUsers()
      // .getFeedbackResponses() // переключити в рядку 406
      .then(data => {
        sessionStorage.setItem("data", JSON.stringify(data));
        const table = dataIntoTable(data);
        document.querySelector("#dynamic-table").appendChild(table);
        document
          .querySelector("#dynamic-table")
          .addEventListener("click", sortColumn);
        // console.log(table);
        return table;
      })
      .then(table => pager(table))
      .catch(error => console.log("smth is wrong! " + error));
  }
}

window.onload = function() {
  createTable();
};

// Sort helper
function sortFn(a, b) {
  let x = Number(a.value);
  let y = Number(b.value);
  if (x && y) {
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  } else {
    if (a.value < b.value) return -1;
    if (a.value > b.value) return 1;
    return 0;
  }
}

// Sort the list
function sortList(list, direction) {
  let sorted = list.sort(sortFn);
  if (direction === -1) {
    list.reverse();
  }
  return sorted;
}

function dataIntoTable(data) {
  const tableHeaders = data.reduce((accum, elem) => {
    // to collect the full array of possible keys
    Object.keys(elem).forEach(el => {
      if (accum.indexOf(el) === -1) {
        accum.push(el);
      }
    });
    return accum;
  }, []);

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  // filling the header row
  tableHeaders.forEach(el => {
    const cell = document.createElement("th");
    cell.innerHTML = `<a href = '#'>${el}</a>`;

    // cell.innerHTML = el;
    headerRow.appendChild(cell);
  });

  //filling the regular table
  data.forEach(item => {
    const normalRow = document.createElement("tr");
    normalRow.setAttribute("data-id", item.id);
    normalRow.setAttribute("data-type", "users");
    // normalRow.setAttribute("data-type", "feedBack");

    tableHeaders.forEach(headItem => {
      const cell = document.createElement("td");
      if (item[headItem] instanceof Array && item[headItem].length > 0) {
        cell.innerHTML = item[headItem].reduce((accum, elem) => {
          return accum += `${elem["skill"]}: ${elem["level"]}<br>`
        }, "");
      } else {
        cell.innerHTML = item[headItem] || "no data";
      }
      normalRow.appendChild(cell);
    });
    // plus download CSV control
    const cellCsv = document.createElement("td");
    cellCsv.innerHTML = '<button class="download-csv--row">Download csv</button>';
    normalRow.appendChild(cellCsv);

    tbody.appendChild(normalRow);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);

  table.addEventListener("click", downloader.handleDownloadItem);

  return table;
}

function sortColumn(evt) {
  evt.preventDefault();
  const el = evt.target;
  if (el.nodeName !== "A") return;

  const table = document.createElement("table");
  table.innerHTML = sessionStorage.getItem("tableInitial");
  // const table = document.querySelector("table");
  const tBody = table.tBodies[0];
  const th = el.parentNode;
  const initialTH = Array.from(table.tHead.rows[0].cells).find(
    item => item.querySelector("a").textContent === el.textContent
  );
  const cellIndex = Array.from(table.tHead.rows[0].cells).indexOf(initialTH);
  let list = [];

  Array.from(table.rows).forEach((row, index) => {
    if (index > 0) {
      const cell = row.cells[cellIndex];
      const content = cell.textContent;
      list.push({
        value: content,
        row: row
      });
    }
  });

  // checking, if this row was the last sorted
  const hasAscendentClassName = th.className.match("ascendentSort");
  const hasDescendentClassName = th.className.match("descendentSort");

  list = sortList(list, hasAscendentClassName ? -1 : 1);

  // changing descendentSort|ascendentSort or setting it the first time
  if (hasAscendentClassName) {
    th.className = th.className.replace(/ascendentSort/, "descendentSort");
  } else {
    if (hasDescendentClassName) {
      th.className = th.className.replace(/descendentSort/, "ascendentSort");
    } else {
      th.className += "ascendentSort";
    }
  }

  //taking descendentSort|ascendentSort away, if needed
  let lastSortedTh = document.querySelector("*[class^='Sort']");
  if (lastSortedTh && th !== lastSortedTh) {
    this.lastSortedTh.className = this.lastSortedTh.className.replace(
      /descendentSort|ascendentSort/g,
      ""
    );
  }
  let fragment = document.createDocumentFragment();
  list.forEach(item => {
    fragment.appendChild(item.row);
  });
  tBody.appendChild(fragment);

  // push new table to session storage and start paging from 1st page
  const newHead = el.closest("thead");
  const newTable = document.createElement("table");
  newTable.innerHTML = newHead.outerHTML + tBody.outerHTML;
  const tabDiv = document.querySelector("#dynamic-table");
  tabDiv.innerHTML = newTable.outerHTML;
  const tab = tabDiv.querySelector("table");
  pager(tab);
}
