import { refs } from "./refs";
import debounce from "./debounce";
import '@babel/polyfill';

export const debouncedSearch = debounce(300, findOnPage);

const backup = refs.site.siteBody.innerHTML;

function findOnPage(evt) {
  if (evt.target !== document.querySelector(".search__input")) {
    return;
  }
  const input = document.querySelector(".search__input").value;
  findOnPageBack();
  findOnPageGo();

  function findOnPageGo() {
    const search = eval("/" + input + "/ig");
    let newHTML = document.body.innerHTML.replace(/\n/g, "");
    const result = newHTML.match(/>(.*?)</g);
    const result_arr = [];
    for (let i = 0; i < result.length; i++) {
      const change = result[i].match(search);
      result_arr[i] = result[i].replace(
        search,
        '<span style="background-color:yellow;">' + change + "</span>"
      );
    }
    for (var i = 0; i < result.length; i++) {
      newHTML = newHTML.replace(result[i], result_arr[i]);
    }

    document.body.innerHTML = newHTML;
    document.querySelector(".search__input").value = input;
    document.querySelector(".search__input").focus();
    refs.site.siteBody.addEventListener("input", debouncedSearch);
    document.querySelector(".search__input").addEventListener("blur", findOnPageBack);
    document.body.addEventListener("click", reloadClick);
  }

}

function findOnPageBack() {
  document.body.innerHTML = backup;
  refs.site.siteBody.innerHTML = backup;
}

function reloadClick(evt) {
  if (evt.target !== document.querySelector(".search__input")) {
    location.reload();
  }
}