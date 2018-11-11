import { refs } from "./refs";
import * as clickHandler from "../general/clickHandler";
import * as hbs from "../personal/hbs";
import * as api from "../api/api";

export function siteReady() {
  // console.log(id);
  // console.log(typeof(id));
  refs.site.siteLogo.focus();
  try {
    const loggedInUserId =
      localStorage.getItem("id") || sessionStorage.getItem("id");
    if (loggedInUserId) {
      // console.log(loggedInUserId);
      //hiding login/register buttons from site:
      refs.site.registerButtonMain.map(el => clickHandler.hide(el));

      //   changing the content of nav elements:
      refs.site.registerButtonNav.textContent = "Logout";
      refs.site.registerButtonNav.dataset.content = "logout";
      refs.site.logInButtonNav.innerHTML =
        "Доброго вечора,<br>oleksandr.zadorozhnyi@googlemail.com";
      refs.site.logInButtonNav.dataset.content = "greeting";
      refs.site.logInButtonNav.setAttribute("href", refs.site.locationLoggedIn);

      // showing "logged in" section:
      clickHandler.show(refs.loggedIn.loggedInSection);
      // console.log("row 28");
      // filling the "logged in section with the needed content"
      hbs.findUser();
      // console.log(loggedInUserId);
      // api.getUserById(51).then(client => {
      //   console.log("and the client is...");
      //   console.log(client);
      // });
      // api
      //   .getUserById(loggedInUserId)
      //   .then(client => {
      //     console.log(client);
      //     hbs.personalOutlookRender(client);
      //   })
      //   .catch(error => console.log("User not found! " + error));
    } else {
      //show login/register buttons from site:
      refs.site.registerButtonMain.map(el => clickHandler.show(el));

      //   changing back the content of nav elements:
      refs.site.registerButtonNav.textContent = "Register";
      delete refs.site.registerButtonNav.dataset.content;
      refs.site.logInButtonNav.innerHTML = "Log in";
      delete refs.site.logInButtonNav.dataset.content;
      refs.site.logInButtonNav.setAttribute("href", "#");

      // hiding "logged in" section:
      clickHandler.hide(refs.loggedIn.loggedInSection);
    }
  } catch (err) {
    console.log("user is not logged in. Loading normally..." + err);
  }
}
