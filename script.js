"use strict";

const problemSelector = document.querySelector("#problemSelector");
const problemStatement = document.querySelector("#problemStatement");
const problemCode = document.querySelector("#problemCode");
const problemOutput = document.querySelector("#problemOutput");
const executeBtn = document.querySelector("#execute");
const functionsObj = {};
let currentProblem;

const problemCollection = {};

problemSelector.addEventListener("change", function(event) {
  var problem = event.target.value;
  console.log("switch to problem ", problem);
  if (problemCollection[problem] === undefined) {
    fetchProblem(String(problem));
  }
  loadProblemElements(problem);
});

function fetchProblem(id) {
  problemCollection[id] = {};
  fetch(`./problems/statements/${id}.html`).then(function(response) {
    let text = response.text().then(function(text) {
      problemCollection[id].statement = text;
    });
  });
  fetch(`./problems/solutions/${id}.js`).then(function(response) {
    let text = response.text().then(function(text) {
      problemCollection[id].code = text;
    });
  });
  problemCollection[id].codeSrc = `./problems/solutions/${id}.js`;
}

function loadProblemElements(id) {
  let script = document.createElement("script");
  script.src = problemCollection[id].codeSrc;
  document.head.appendChild(script);
  problemStatement.innerHTML = problemCollection[id].statement;
  problemCode.innerHTML = problemCollection[id].code;

  assignProblem();
}

function displayResult(result) {
  problemOutput.textContent = result;
}

function assignProblem() {
  executeBtn.onclick = currentProblem;
}

//initialize
fetchProblem("001");
