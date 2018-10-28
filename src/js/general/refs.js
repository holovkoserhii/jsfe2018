"use strict";

export const refs = {
  site: {
    siteBody: document.querySelector("body"),
    logInButtonNav: document.querySelector(".main-nav__item--login"),
    registerButtonNav: document.querySelector(".main-nav__item--register"),
    registerButtonMain: document.querySelectorAll(".register"),
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
  }
};
