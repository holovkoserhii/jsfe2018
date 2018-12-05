"use strict";
import "@babel/polyfill";

export default function downloadCsv(incomingArray) {

  //header Constructor
  var csvHeader = Object.keys(incomingArray[0]).join("\t") + "\r\n";
  const hasSkills = Object.keys(incomingArray[0]).find(key => {
    return key === "skills";
  });
  if (hasSkills) {
    const newCsvHeader = csvHeader.replace(hasSkills, "skill\tlevel");
    csvHeader = newCsvHeader;
  }

  //body Constructor
  let csvBody = "";
  if (hasSkills) {
    csvBody = incomingArray.reduce((accumObject, object) => {
      const thisManySkills = object.skills.length;
      const positionOfSkills = Object.keys(object).indexOf("skills");
      const normalBody = Object.values(object);

      if (thisManySkills > 0) {
        for (let i = 0; i < thisManySkills; i++) {
          for (let j = 0; j < normalBody.length; j++) {
            if (j !== positionOfSkills) {
              if (j === normalBody.length - 1) {
                accumObject += normalBody[j] + "\r\n";
              } else {
                accumObject += normalBody[j] + "\t";
              }
            } else {
              accumObject += `${normalBody[j][i].skill}\t${
                normalBody[j][i].level
              }\t`;
            }
          }
        }
        return accumObject;
      } else {
        // creating one more element to aling csv vertically
        let arr = Object.values(object);
        const ind = Object.keys(incomingArray[0]).indexOf("skills");
        arr.splice(ind + 1, 0, "");
        accumObject += arr.join("\t") + "\r\n";
        return accumObject;
      }
    }, "");
  } else {
    csvBody = incomingArray.reduce((accum, elem) => {
      return (accum += Object.values(elem).join("\t") + "\r\n");
    }, "");
  }

  let hiddenElement = document.createElement("a");
  hiddenElement.href =
    "data:text/csv;charset=utf-8," + encodeURI(csvHeader + csvBody);
  hiddenElement.target = "_blank";
  hiddenElement.download = "report.csv";
  hiddenElement.click();
}
