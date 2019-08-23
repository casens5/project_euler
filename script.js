"use strict";

const problemSelector = document.querySelector("#problemSelector");
const problemStatement = document.querySelector("#problemStatement");
const problemCode = document.querySelector("#problemCode");
const problemOutput = document.querySelector("#problemOutput");
const executeBtn = document.querySelector("#execute");
const functionsObj = {};

const problemCollection = {
  "-": {
    codeSrc: null,
    statement: null,
    code: null
  }
};

problemSelector.addEventListener("change", function(event) {
  var problem = event.target.value;
  console.log("switch to problem ", problem);
  if (problemCollection[problem] === undefined) {
    fetchProblem(String(problem));
  } else {
    loadProblemElements(problem);
  }
  assignExecuteBtn(problem);
});

function fetchProblem(id) {
  problemCollection[id] = {};
  fetch(`./problems/statements/${id}.html`).then(function(response) {
    let text = response.text().then(function(text) {
      problemCollection[id].statement = text;
    });
    console.log("problem statement assigned:", id);
  });
  fetch(`./problems/solutions/${id}.js`)
    .then(function(response) {
      let text = response.text().then(function(text) {
        problemCollection[id].code = text;
      });
    })
    .then((problemCollection[id].codeSrc = `./problems/solutions/${id}.js`))
    .then(loadProblemElements(id));
}

function loadProblemElements(id) {
  let script = document.createElement("script");
  script.src = problemCollection[id].codeSrc;
  document.head.appendChild(script);
  problemStatement.innerHTML = problemCollection[id].statement;
  problemCode.innerHTML = problemCollection[id].code;
}

function displayResult(result) {
  problemOutput.textContent = result;
}

function assignExecuteBtn(id) {
  executeBtn.onclick = eval(`euler${id}()`);
}
