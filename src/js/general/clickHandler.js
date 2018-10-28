"use strict";

import { refs } from "./refs";

export function handleClicks(evt) {
  const target = evt.target;
  switch (target) {
    case refs.modal.logInButton:
      modalShowLogIn();
      break;
    case refs.modal.registerButton:
      modalShowRegister();
      break;
    case refs.modal.closeElement:
      hide(refs.modal.pageModal);
      break;
    case refs.site.registerButtonNav:
      modalShowRegister();
      show(refs.modal.pageModal);
      break;
    case refs.site.logInButtonNav:
      modalShowLogIn();
      show(refs.modal.pageModal);
      break;
  }

  if (refs.site.registerButtonMain.includes(target)) {
    modalShowRegister();
    show(refs.modal.pageModal);
  }
}

export function modalHelpersEventHandlers(evt) {
  const target = evt.target;
  const type = evt.type;
  if (!(refs.modal.textInput.includes(target) || type == "keyup")) return;
  const label = refs.modal.label.find(
    lab => lab.getAttribute("for") == target.id
  );
  if (target.value === "") {
    label.classList.remove("active");
    labelsReset(label, target);
  } else {
    label.classList.add("active");
    if (target.value.length > 7) {
      analyzeValid(target, label);
      // if (target.value)
    } else {
      labelsReset(label, target);
    }
  }
}

function hide(elem) {
  if (elem.classList.contains("visually-hidden")) return;
  elem.classList.add("visually-hidden");
}

function show(elem) {
  if (!elem.classList.contains("visually-hidden")) return;
  elem.classList.remove("visually-hidden");
}

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
}

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
}

function analyzeValid(input, label) {
  const inputType = input.getAttribute("type");
  const labelFor = label.getAttribute("for");
  if (
    inputType === "password" &&
    !(labelFor === "pass1-register" || labelFor === "pass2-register")
  )
    return;
  const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const PASS_PATTERN = /^(?=.*\d)(?=.*[a-zA-Z]).{8}$/;
  switch (inputType) {
    case "email":
      if (EMAIL_PATTERN.test(input.value)) {
        label.classList.add("valid");
        label.classList.remove("invalid");
        label.textContent = "Email address is valid";
      } else {
        label.classList.add("invalid");
        label.classList.remove("valid");
        label.textContent = "Email address is invalid";
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
        } else {
          label.classList.add("invalid");
          label.classList.remove("valid");
          label.textContent =
            "The password must contain at least one letter and one number and be 8 symbols long";
        }
      }
      else {
        if (input.value === refs.modal.pass1Register.value) {
          label.classList.add("valid");
          label.classList.remove("invalid");
          label.textContent = "The passwords match";
        } else {
          label.classList.add("invalid");
          label.classList.remove("valid");
          label.textContent = "The passwords do not match";
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
      label.textContent = "Create a password";
    } else if (input.getAttribute("id") === "pass2-register") {
      label.textContent = "Repeat the password";
    } else label.textContent = "Password";
  }
}
