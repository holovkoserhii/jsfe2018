"use strict";

export const refs = {
  site: {
    siteLogo: document.querySelector(".site-logo"),
    siteBody: document.querySelector("body"),
    logInButtonNav: document.querySelector(".main-nav__item--login"),
    registerButtonNav: document.querySelector(".main-nav__item--register"),
    registerButtonMain: Array.from(document.querySelectorAll(".register")),
    nav: document.querySelector(".main-nav"),
    searchForm: document.querySelector("form.search"),
    searchBar: document.querySelector(".search__input"),
    locationLoggedIn: "http://localhost:9000/#logged-in",
    feedBackForm: document.querySelector("#feedback"),
    feedBackName: document.querySelector("#feedback__name"),
    feedBackEmail: document.querySelector("#feedback__email"),
    feedBackText: document.querySelector("#feedback__message")
  },
  modal: {
    modal: document.querySelector(".page-modal__wrapper"),
    pageModal: document.querySelector(".page-modal"),
    logInButton: document.querySelector(".page-modal__tab--login a"),
    registerButton: document.querySelector(".page-modal__tab--register a"),
    loginTabContent: document.querySelector("#page-modal__login"),
    registerTabContent: document.querySelector("#page-modal__register"),
    closeElement: document.querySelector(".page-modal__close-modal"),
    textInput: Array.from(
      document.querySelectorAll(".page-modal__user-text-input")
    ),
    label: Array.from(document.querySelectorAll(".page-modal label")),
    remember: document.querySelector("#remember-me"),
    emailLogin: document.querySelector("#email-login"),
    emailLoginLabel: document.querySelector("label[for='email-login']"),
    passLogin: document.querySelector("#pass-login"),
    passLoginLabel: document.querySelector("label[for='pass-login']"),
    emailRegister: document.querySelector("#email-register"),
    emailRegisterLabel: document.querySelector("label[for='email-register']"),
    pass1Register: document.querySelector("#pass1-register"),
    pass1RegisterLabel: document.querySelector("label[for='pass1-register']"),
    pass2Register: document.querySelector("#pass2-register"),
    pass2RegisterLabel: document.querySelector("label[for='pass2-register']"),
    loginGoButton: document.querySelector(".page-modal__button--log-in"),
    registerGoButton: document.querySelector(".page-modal__button--register-new"),
    formLogin: document.querySelector(".page-modal__form-login"),
    formRegister: document.querySelector(".page-modal__form-register"),
  },
  backEnd: {
    apiUrl: "http://localhost:3000/",
    feedBack: "feedback/",
    users: "users/",
  },
  loggedIn: {
    loggedInSection: document.querySelector(".logged-in"),
    // personalForm: document.querySelector("#logged-in__personal-form"),
    // personalFormFields: Array.from(document.querySelectorAll(".logged-in__input")),
    // personalFormName: document.querySelector("#logged-in__name"),
    // personalFormTelephone: document.querySelector("#logged-in__telephone"),
    // personalFormLocation: document.querySelector("#logged-in__location"),
    // personalFormSalary: document.querySelector("#logged-in__salary"),
    // personalFormAbout: document.querySelector("#logged-in__about"),
    // coreTable: document.querySelector(".logged-in__core"),
  }
};
