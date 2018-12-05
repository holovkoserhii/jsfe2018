"use strict";
import '@babel/polyfill';


export default class User {
  constructor(login, pass) {
    this.login = login;
    this.pass = pass;
    this.salary = null;
    this.telephone = null;
    this.location = null;
    this._admin = false;
    this.language = "en";
    this.skills = [];
    this.name = null;
    this.about = "";
    this.updateDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  }
}
