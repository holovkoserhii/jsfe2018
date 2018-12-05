import '@babel/polyfill';

export function pager(table) {
  const rowsPerPage = 10;
  const rowsCount = table.rows.length;
  const currentPage = 1;
  const pageCount = Math.ceil(rowsCount / rowsPerPage);
  if (pageCount > 1) {
    const fullTable = table.cloneNode(true);
    sessionStorage.setItem("tableInitial", JSON.stringify(fullTable.innerHTML));
    table.insertAdjacentHTML("afterend", "<div id='adminTableButtons'></div");
    showOnPage({
      pageNumber: currentPage,
      table: table,
      rowsPerPage: rowsPerPage,
      pageCount: pageCount
    });
  }
}

export function showOnPage({ pageNumber, table, rowsPerPage, pageCount }) {
  const fullTable = document.createElement("table");
  fullTable.innerHTML = JSON.parse(sessionStorage.getItem("tableInitial"));
  let rowsDisplayed = `<thead>${fullTable.rows[0].outerHTML.trim()}</thead>`;
  const rowsCount = fullTable.rows.length;
  const rowsBegin = rowsPerPage * (pageNumber - 1);
  for (
    let i = rowsBegin;
    i < rowsBegin + rowsPerPage && i < rowsCount - 1;
    i++
  ) {
    rowsDisplayed += fullTable.rows[i + 1].outerHTML.trim();
  }
  table.innerHTML = rowsDisplayed;

  if (!document.querySelector("#adminTableButtons").innerHTML) {
    document.querySelector("#adminTableButtons").innerHTML = pageButtons(
      table,
      pageCount,
      pageNumber,
      rowsPerPage
    );
    document
      .querySelector("#adminTableButtons")
      .addEventListener(
        "click",
        propsConstructor.bind(null, table, rowsPerPage, pageCount)
      );
  }

  if (pageNumber === 1) {
    document.querySelector("#pages-prev").disabled = true;
  } else {
    document.querySelector("#pages-prev").disabled = false;
  }

  if (pageNumber === pageCount) {
    document.querySelector("#pages-next").disabled = true;
  } else {
    document.querySelector("#pages-next").disabled = false;
  }

  Array.from(document.querySelector("#adminTableButtons").children).map(elem =>
    elem.removeAttribute("class", "pages-active")
  );
  document
    .getElementById("page" + pageNumber)
    .setAttribute("class", "pages-active");
}

function pageButtons(table, pCount, pNumber, rows) {
  let buttonsHTML = `<button id="pages-prev">&lt;&lt;</button>`;
  for (let i = 1; i <= pCount; i++)
    buttonsHTML += `<button id="page${i}">${i}</button>`;
  buttonsHTML += `<button id="pages-next">&gt;&gt;</button>`;
  return buttonsHTML;
}

export function propsConstructor(table, rowsPerPage, pageCount, evt) {
  if (evt.target.nodeName !== "BUTTON") return;
  const props = {
    table: table,
    rowsPerPage: rowsPerPage,
    pageCount: pageCount,
    pageNumber: parseInt(
      document.querySelector(".pages-active").textContent,
      10
    )
  };

  if (evt.target.id === "pages-next") {
    props.pageNumber++;
  } else if (evt.target.id === "pages-prev") {
    props.pageNumber--;
  } else {
    props.pageNumber = parseInt(evt.target.textContent, 10);
  }
  showOnPage(props);
}
