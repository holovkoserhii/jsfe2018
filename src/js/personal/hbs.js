import * as userTemplateEnglish from "../../templates/user-english.hbs";
import * as userTemplateUkrainian from "../../templates/user-ukrainian.hbs";
import * as adminTemplateEnglish from "../../templates/admin-english.hbs";
import * as adminTemplateUkrainian from "../../templates/admin-ukrainian.hbs";
import { refs } from "../general/refs";
import * as api from "../api/api";

// console.log(userTemplateEnglish);

export function updateUserField(evt) {
  const id = localStorage.getItem("id") || sessionStorage.getItem("id");
  const target = evt.target;
  switch (target) {
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__name"):
      console.log("changing name");
      api.updateUser(id, {name: target.value});
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__telephone"):
      console.log("changing phone");
      api.updateUser(id, {telephone: target.value});
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__location"):
      console.log("changing location");
      api.updateUser(id, {location: target.value});
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__salary"):
      console.log("changing salary");
      api.updateUser(id, {salary: target.value});
      break;
    case refs.loggedIn.loggedInSection.querySelector("#logged-in__about"):
      console.log("changing about");
      api.updateUser(id, {about: target.value});
      break;
  }
}

export function findUser() {
  const id = localStorage.getItem("id") || sessionStorage.getItem("id");
  console.log(id);
  return api
    .getUserById(id)
    .then(data => {
      console.log(data[0]);
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
        obj.coreTable = getCoreTableMarkup(obj.skills);
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
        obj.coreTable = getCoreTableMarkup(obj.skills);
        markup = userTemplateUkrainian(obj);
      }
      refs.loggedIn.loggedInSection.innerHTML = markup;
      break;
  }

  //setting event listener to input fields of a personal form
  const inputArray = Array.from(document.querySelectorAll(".logged-in__input"));
  inputArray.forEach(elem => elem.addEventListener("blur", updateUserField));
}

function getCoreTableMarkup(skillsArr) {
  const tableBegin =
    "<table class='core-skills'><thead><tr><th>Skill</th><th>Strength</th><th>Controls</th></tr></thead><tbody>";
  return (
    skillsArr.reduce((accum, elem) => {
      return (accum += `<tr><td>${elem.skill}</td><td>${
        elem.level
      }</td><td><button>Remove</button></td></tr>`);
    }, tableBegin) + "</tbody></table>"
  );
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

function updateDate() {
  this.updateDate = `${new Date().getDate()}/${new Date().getMonth() +
    1}/${new Date().getFullYear()}`;
}
