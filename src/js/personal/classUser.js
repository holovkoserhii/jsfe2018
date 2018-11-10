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

    this.init();
  }

  init() {
    Object.defineProperty(user, "_salary", {
      configurable: false,
      writable: false,
      enumerable: false
    });
  }

  getGreeting() {
    const hours = new Date().getHours();
    if (hours < 13) {
      if (hours < 6)
        return {
          ukr: "Доброї ночі, ",
          eng: "Good night, "
        };
      return {
        ukr: "Доброго ранку, ",
        eng: "Good morning, "
      };
    } else {
      if (hours < 17)
        return {
          ukr: "Доброго дня, ",
          eng: "Good afternoon, "
        };
      return {
        ukr: "Доброго вечора, ",
        eng: "Good evening, "
      };
    }
  }
}
