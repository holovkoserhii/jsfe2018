import { refs } from "./refs";
import * as clickHandler from "../general/clickHandler";

export function siteReady() {
  try {
    const loggedInUserId =
      localStorage.getItem("id") || sessionStorage.getItem("id");
    if (loggedInUserId) {
      //hiding login/register buttons from site:
      refs.site.registerButtonMain.map(el => clickHandler.hide(el));

      //   changing the content of nav elements:
      refs.site.registerButtonNav.textContent = "Logout";
      refs.site.registerButtonNav.dataset.content = "logout";
      refs.site.logInButtonNav.innerHTML =
        "Доброго вечора,<br>oleksandr.zadorozhnyi@googlemail.com";
      refs.site.logInButtonNav.dataset.content = "greeting";
      refs.site.logInButtonNav.setAttribute('href', refs.site.locationLoggedIn);

      // showing "logged in" section:
      clickHandler.show(refs.loggedIn.loggedInSection);
    } else {
        //show login/register buttons from site:
      refs.site.registerButtonMain.map(el => clickHandler.show(el));

      //   changing back the content of nav elements:
      refs.site.registerButtonNav.textContent = "Register";
      delete refs.site.registerButtonNav.dataset.content;
      refs.site.logInButtonNav.innerHTML = "Log in";
      delete refs.site.logInButtonNav.dataset.content;
      refs.site.logInButtonNav.setAttribute('href', "#");

      // hiding "logged in" section:
      clickHandler.hide(refs.loggedIn.loggedInSection);
    }
  } catch (err) {
    console.log("user is not logged in. Loading normally...");
  }
}
