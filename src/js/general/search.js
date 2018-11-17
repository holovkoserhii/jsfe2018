import { refs } from "./refs";
import debounce from "./debounce";
// import * as pageLoader from "./pageLoader";

export const debouncedSearch = debounce(300, findOnPage);

const backupHTML = document.body.innerHTML;

function findOnPage(evt) {
  if (evt.target !== document.querySelector(".search__input")) {
    return;
  }
  // input = refs.site.searchBar.value; // не працює
  const input = document.querySelector(".search__input").value; // працює
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
      // console.log(result[i]);
      // console.log(search);
      // console.log(a);
      // console.log(typeof a);
      // if (a instanceof Array) {
      //   for (let i = 0; i < a.length; i++)
      //   console.log(a);
      //   result_arr[i] = a.reduce((accum, elem) => {
      //     console.log(accum);
      //     console.log(elem);
      //     accum = result[i].replace(
      //       elem,
      //       '<span style="background-color:yellow;">' + elem + "</span>"
      //     );
      //     console.log(accum);
      //     return accum;
      //   }, result[i]);

      // replace(
      //   search,
      //   '<span style="background-color:yellow;">' + a + "</span>"
      // );

      // console.log("multiple");
      // a.forEach(elem => {
      //   result_arr[i] = result[i].replace(
      //     eval("/" + input + "/g"),
      //     '<span style="background-color:yellow;">' + elem + "</span>"
      //   );
      // });
      // } else {
      // result_arr[i] = result[i].replace(
      //   search,
      //   '<span style="background-color:yellow;">' + a + "</span>"
      // );
      // }
      // result_arr[i] = result[i].replace(
      //   search,
      //   '<span style="background-color:yellow;">' + a + "</span>"
      // );
      // if (typeof(a))
    }
    for (var i = 0; i < result.length; i++) {
      newHTML = newHTML.replace(result[i], result_arr[i]);
    }

    document.body.innerHTML = newHTML; // момент істини

    // refs.site.searchBar.value = input; // не працює
    document.querySelector(".search__input").value = input; // працює
    // refs.site.searchBar.focus(); // не працює
    document.querySelector(".search__input").focus(); // працює
    refs.site.siteBody.addEventListener("input", debouncedSearch);
  }

  function findOnPageBack() {
    // console.log("back began");
    document.body.innerHTML = backupHTML;
    // console.log(backupHTML);
    // console.log("back finished");
  }
}
