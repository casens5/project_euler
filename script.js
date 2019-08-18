"use strict";

const problemSelector = document.querySelector("#problemSelector");
const problemStatement = document.querySelector("#problemStatement");
const problemCode = document.querySelector("#problemCode");
const problemOutput = document.querySelector("#problemOutput");

const problemCollection = {
  "001": {
    statement: "statement001.html",
    code: "euler001.js"
  }
};

problemSelector.addEventListener("change", function(event) {
  var problem = event.target.value;
  console.log("switch to problem ", problem);
  problemStatement.innerHTML = problemCollection[`${problem}`].statement;
});

fetch('./statement001.html')
  .then(function(response) {
    console.log(response);
	});
