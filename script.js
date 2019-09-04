"use strict";

const problemSelector = document.querySelector("#problemSelector");
const problemStatement = document.querySelector("#problemStatement");
const problemCode = document.querySelector("#problemCode");
const problemOutput = document.querySelector("#problemOutput");
const executeBtn = document.querySelector("#executeProblem");
const clearBtn = document.querySelector("#clearAnswer");

const problemCollection = {
  "-": {
    codeSrc: null,
    statement: null,
    code: null
  }
};

clearBtn.onclick = function() {
  displayAnswer(null);
};

problemSelector.addEventListener("change", function(event) {
  var problem = event.target.value; // this is a string
  console.log("switch to problem ", problem);
  if (problemCollection[problem] === undefined) {
    fetchProblem(problem);
  } else {
    loadProblemElements(problem);
  }
});

function fetchProblem(id) {
  problemCollection[id] = {};
  fetch(`./problems/statements/${id}.html`).then(function(response) {
    let text = response
      .text()
      .then(function(text) {
        problemCollection[id].statement = text;
        console.log("problem statement assigned:", id);
      })
      .then(function() {
        fetch(`./problems/solutions/${id}.js`).then(function(response) {
          let text = response
            .text()
            .then(function(text) {
              problemCollection[id].code = text;
              console.log("problem code assigned");
            })
            .then(function() {
              problemCollection[id].codeSrc = `./problems/solutions/${id}.js`;
              console.log("script assigned");
            })
            .then(function() {
              loadProblemElements(id);
            });
        });
      });
  });
}

function loadProblemElements(id) {
  let script = document.createElement("script");
  script.src = problemCollection[id].codeSrc;
  script.async = false;
  script.onload = function() {
    executeBtn.onClick = function() {
      displayAnswer(window[`euler${id}`]());
    };
  };
  document.head.appendChild(script);
  problemStatement.innerHTML = problemCollection[id].statement;
  problemCode.innerHTML = problemCollection[id].code;
  console.log("DOM filled with problem elements");
}

function displayAnswer(string) {
  problemOutput.textContent = string;
}
