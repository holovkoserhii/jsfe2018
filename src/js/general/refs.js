"use strict";

export const refs = {
  site: {
    siteBody: document.querySelector("body"),
    logInButtonNav: document.querySelector(".main-nav__item--login"),
    registerButtonNav: document.querySelector(".main-nav__item--register"),
    registerButtonMain: Array.from(document.querySelectorAll(".register")),
    nav: document.querySelector(".main-nav"),
  },
  modal: {
    modal: document.querySelector(".page-modal__wrapper"),
    pageModal: document.querySelector(".page-modal"),
    logInButton: document.querySelector(".page-modal__tab--login a"),
    registerButton: document.querySelector(".page-modal__tab--register a"),
    loginTabContent: document.querySelector("#page-modal__login"),
    registerTabContent: document.querySelector("#page-modal__register"),
    closeElement: document.querySelector(".page-modal__close-modal"),
    textInput: Array.from(document.querySelectorAll(".page-modal__user-text-input")),
    label: Array.from(document.querySelectorAll(".page-modal label")),
    remember: document.querySelector("#remember"),
    emailLogin: document.querySelector("#email-login"),
    passLogin: document.querySelector("#pass-login"),
    emailRegister: document.querySelector("#email-register"),
    pass1Register: document.querySelector("#pass1-register"),
    pass2Register: document.querySelector("#pass2-register"),
  }
};
