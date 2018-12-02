import { refs } from "./refs";
import * as api from "../api/api";
import * as pageLoader from "./pageLoader";
import User from "../personal/classUser";

export function handleClicks(evt) {
  const target = evt.target;
  switch (target) {
    case refs.modal.logInButton:
      modalShowLogIn();
      refs.modal.emailLogin.focus();
      break;
    case refs.modal.registerButton:
      modalShowRegister();
      refs.modal.emailRegister.focus();
      break;
    case refs.modal.closeElement:
      hide(refs.modal.pageModal);
      break;
    case refs.site.registerButtonNav:
      if (refs.site.registerButtonNav.dataset.content === "logout") {
        localStorage.removeItem("id");
        sessionStorage.removeItem("id");
        delete refs.site.registerButtonNav.dataset.content;
        refs.site.registerButtonNav.textContent = "Register";
        pageLoader.siteReady();
      } else {
        modalShowRegister();
        show(refs.modal.pageModal);
        refs.modal.emailRegister.focus();
      }
      break;
    case refs.site.logInButtonNav:
      if (refs.site.logInButtonNav.dataset.content !== "greeting") {
        modalShowLogIn();
        show(refs.modal.pageModal);
        refs.modal.emailLogin.focus();
      }
      break;
  }

  if (refs.site.registerButtonMain.includes(target)) {
    modalShowRegister();
    refs.modal.emailRegister.focus();
    show(refs.modal.pageModal);
  }
}

// Modal helpers - hints for a user
export function modalHelpersEventHandlers(evt) {
  const target = evt.target;
  const type = evt.type;
  if (!(refs.modal.textInput.includes(target) || type == "keyup")) return;
  const label = refs.modal.label.find(
    lab => lab.getAttribute("for") == target.id
  );
  if (target.type !== "submit") {
    if (target.value === "") {
      label.classList.remove("active");
      labelsReset(label, target);
    } else {
      label.classList.add("active");
      if (target.value.length > 7) {
        analyzeValid(target, label);
      } else {
        labelsReset(label, target);
      }
    }
  }
}

export function loginRegister(evt) {
  evt.preventDefault();
  const target = evt.target;
  switch (target) {
    case refs.modal.formLogin:
      api.getUserByQuery(
        {
          login: refs.modal.emailLogin.value,
          pass: refs.modal.passLogin.value
        },
        "loggingIn"
      );
      break;
    case refs.modal.formRegister:
      if (refs.modal.pass1Register.value === refs.modal.pass2Register.value)
        api.getUserByQuery(
          { login: refs.modal.emailRegister.value },
          "registering"
        );
      break;
  }
}

export function hide(elem) {
  if (elem.classList.contains("visually-hidden")) return;
  elem.classList.add("visually-hidden");
}

export function show(elem) {
  if (!elem.classList.contains("visually-hidden")) return;
  elem.classList.remove("visually-hidden");
}

// Switching between tabs in a modal
function modalShowRegister() {
  if (
    !refs.modal.logInButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  if (
    refs.modal.registerButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  refs.modal.logInButton.parentNode.classList.remove(
    "page-modal__tab--modal-tab-active"
  );
  refs.modal.registerButton.parentNode.classList.add(
    "page-modal__tab--modal-tab-active"
  );
  hide(refs.modal.loginTabContent);
  show(refs.modal.registerTabContent);
  clearLogin();
}

// Switching between tabs in a modal
function modalShowLogIn() {
  if (
    refs.modal.logInButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  if (
    !refs.modal.registerButton.parentNode.classList.contains(
      "page-modal__tab--modal-tab-active"
    )
  )
    return;
  refs.modal.logInButton.parentNode.classList.add(
    "page-modal__tab--modal-tab-active"
  );
  refs.modal.registerButton.parentNode.classList.remove(
    "page-modal__tab--modal-tab-active"
  );
  show(refs.modal.loginTabContent);
  hide(refs.modal.registerTabContent);
  clearRegister();
}

function clearLogin() {
  refs.modal.formLogin.reset();
  labelsReset(refs.modal.emailLoginLabel, refs.modal.emailLogin);
  labelsReset(refs.modal.passLoginLabel, refs.modal.passLogin);
}

function clearRegister() {
  refs.modal.formRegister.reset();
  labelsReset(refs.modal.emailRegisterLabel, refs.modal.emailRegister);
  labelsReset(refs.modal.pass1RegisterLabel, refs.modal.pass1Register);
  labelsReset(refs.modal.pass2RegisterLabel, refs.modal.pass2Register);
}

// Email and password validation
function analyzeValid(input, label) {
  const inputType = input.getAttribute("type");
  const labelFor = label.getAttribute("for");
  if (
    inputType === "password" &&
    !(labelFor === "pass1-register" || labelFor === "pass2-register")
  )
    return;
  const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/;
  const PASS_PATTERN = /^\w{8}$/;
  switch (inputType) {
    case "email":
      if (EMAIL_PATTERN.test(input.value)) {
        label.classList.add("valid");
        label.classList.remove("invalid");
        label.textContent = "Email address is valid";
        return true;
      } else {
        label.classList.add("invalid");
        label.classList.remove("valid");
        label.textContent = "Email address is invalid";
        return false;
      }
      break;
    case "password":
      //trimming the password by 8 symbols
      const correctPass = input.value.substring(0, 8);
      input.value = correctPass;
      if (labelFor === "pass1-register") {
        //toggling the classes
        if (PASS_PATTERN.test(input.value)) {
          label.classList.add("valid");
          label.classList.remove("invalid");
          label.textContent = "The password is valid";
          return true;
        } else {
          label.classList.add("invalid");
          label.classList.remove("valid");
          label.textContent =
            "The password must contain at least one letter and one number (without special symbols) and be 8 symbols long";
          return false;
        }
      } else {
        if (input.value === refs.modal.pass1Register.value) {
          label.classList.add("valid");
          label.classList.remove("invalid");
          label.textContent = "The passwords match";
          return true;
        } else {
          label.classList.add("invalid");
          label.classList.remove("valid");
          label.textContent = "The passwords do not match";
          return false;
        }
      }
      break;
  }
}

function labelsReset(label, input) {
  label.classList.remove("valid");
  label.classList.remove("invalid");
  if (input.getAttribute("type") === "email") {
    label.textContent = "Email Address";
  } else {
    if (input.getAttribute("id") === "pass1-register") {
      label.textContent = "Create a password 8 symbols long";
    } else if (input.getAttribute("id") === "pass2-register") {
      label.textContent = "Repeat the password";
    } else {
      if (input.getAttribute("type") === "password")
        label.textContent = "Password";
    }
  }
}

function handleCreateUser() {
  const login = refs.modal.emailRegister.value;
  const pass = refs.modal.pass1Register.value;
  const user = new User(login, pass);
  api.createUser(user);
  hide(refs.modal.pageModal);
}

export function handleUserActions(userArray, state) {
  switch (state) {
    case "registering":
      if (userArray.length > 0) {
        alert(
          "This e-mail is registered in the system. Please, log in using the log-in section instead"
        );
        return;
      } else {
        handleCreateUser();
        clearRegister();
        hide(refs.modal.pageModal);
      }
    case "loggingIn":
      if (!userArray[0]) {
        refs.modal.passLoginLabel.classList.add("invalid");
        refs.modal.passLoginLabel.textContent = "Wrong password";
        return;
      }
      if (refs.modal.remember.checked) {
        localStorage.setItem("id", userArray[0].id);
      } else {
        sessionStorage.setItem("id", userArray[0].id);
      }
      clearLogin();
      hide(refs.modal.pageModal);
      pageLoader.siteReady();
      location.href = refs.site.locationLoggedIn;
  }
}

export function feedBackFormSubmit(evt) {
  evt.preventDefault();
  const feedBackUnit = {
    name: refs.site.feedBackName.value,
    email: refs.site.feedBackEmail.value,
    text: refs.site.feedBackText.value
  };
  api.sendFeedBack(feedBackUnit);
  refs.site.feedBackForm.reset();
}
