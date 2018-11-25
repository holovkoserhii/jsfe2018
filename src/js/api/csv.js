"use strict";

export default function downloadCsv(incomingArray) {
  console.log("csv started");
  //header Constructor
  let csvHeader = Object.keys(incomingArray[0]).join(",") + "\r\n";
  const hasSkills = Object.keys(incomingArray[0]).find(key => {
    return key === "skills";
  });
  if (hasSkills) {
    const newCsvHeader = csvHeader.replace(hasSkills, "skill,level");
    csvHeader = newCsvHeader;
  }

  //body Constructor
  let csvBody = "";
  // console.log("hasSkills: ", hasSkills);
  if (hasSkills) {
    csvBody = incomingArray.reduce((accumObject, object) => {
      const thisManySkills = object.skills.length;
      const positionOfSkills = Object.keys(object).indexOf("skills");
      const normalBody = Object.values(object);
      console.log("thisManySkills: ", thisManySkills);
      console.log("positionOfSkills: ", positionOfSkills);

      if (thisManySkills > 0) {
        for (let i = 0; i < thisManySkills; i++) {
          for (let j = 0; j < normalBody.length; j++) {
            if (j !== positionOfSkills) {
              if (j === normalBody.length - 1) {
                accumObject += normalBody[j] + "\r\n";
              } else {
                accumObject += normalBody[j] + ",";
              }
            } else {
              console.log(normalBody[j]);
              accumObject += `${normalBody[j][i].skill},${
                normalBody[j][i].level
              },`;
            }
          }
          console.log(accumObject[accumObject.length - 1]);
        }
        return accumObject;
      } else {
        console.log("zero skills");
        return csvBody = incomingArray.reduce((accum, elem) => {
          return (accum += Object.values(elem).join(",") + "\r\n");
        }, "");
      }
    }, "");
  } else {
    console.log("no skills");
    csvBody = incomingArray.reduce((accum, elem) => {
      return accum += Object.values(elem).join(",") + "\r\n";
    }, "");
  }

  console.log(csvHeader);
  console.log(csvBody);

  let hiddenElement = document.createElement("a");
  hiddenElement.href =
    "data:text/csv;charset=utf-8," + encodeURI(csvHeader + csvBody);
  hiddenElement.target = "_blank";
  hiddenElement.download = "report.csv";
  hiddenElement.click();
}
