export default function downloadCsv(incomingArray) {
  const csvHeader = Object.keys(incomingArray[0]).join(",") + "\r\n";
  const csvBody = incomingArray.reduce((accum, elem) => {
    return accum += Object.values(elem).join(",") + "\r\n";
  }, "");

  let hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvHeader + csvBody);
  hiddenElement.target = "_blank";
  hiddenElement.download = "report.csv";
  hiddenElement.click();
}

// import csv from "../personal/csv";
// csv([{a:1, b:1}, {a:2, b:2}, {a:3, b:3}]);