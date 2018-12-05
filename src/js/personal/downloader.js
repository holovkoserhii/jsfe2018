import '@babel/polyfill';
import csv from "../api/csv";
import * as api from "../api/api";

export function handleDownloadItem(evt) {
  const target = evt.target;
  if (!target.classList.contains("download-csv--row")) return;
  const id = target.closest("tr").dataset.id;
  const type = target.closest("tr").dataset.type;
  if (type === "users") {
    api
      .getUserById(id)
      .then(data => csv(data))
      .catch(error => console.log("Error in download process! " + error));
  }
  if (type === "feedBack") {
    api
      .getFeedbackResponseById(id)
      .then(data => csv(data))
      .catch(error => console.log("Error in download process! " + error));
  }
}

export function loadReport(evt) {
  if (evt.target.nodeName !== "BUTTON") return;
  if (evt.target.classList.contains("logged-in__download--seen")) {
    const data = JSON.parse(sessionStorage.getItem("filteredData"));
    csv(data);
  }
  if (evt.target.classList.contains("logged-in__download--full")) {
    const data = JSON.parse(sessionStorage.getItem("fullData"));
    csv(data);
  }
}
