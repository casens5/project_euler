"use strict";

const problemsObj = {
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
  if (problemsObj[problem] === undefined) {
    fetchProblem(problem);
  } else {
    loadProblemElements(problem);
  }
});

function buildExpandos() {
  let targets = document.querySelectorAll(".expando");
  let labels = ["problem", "data", "code"];
  targets.forEach(function(item) {
    let label = document.createElement("span");
    let content = document.createElement("div");
    content.classList = "content";
    label.classList = "label";
    label.textContent = labels.shift();
    item.appendChild(label);
    item.appendChild(content);
    label.addEventListener("click", function(event) {
      item.children[1].classList.toggle("hidden");
    });
  });
  codeDiv.children[1].classList.add("code", "harold", "hidden");
}

function fetchProblem(id) {
  problemsObj[id] = {};
  fetch(`./problems/statements/${id}.html`).then(function(response) {
    let text = response
      .text()
      .then(function(text) {
        problemsObj[id].statement = text;
        console.log("problem statement assigned:", id);
      })
      .then(function() {
        fetch(`./problems/solutions/${id}.js`).then(function(response) {
          let text = response
            .text()
            .then(function(text) {
              problemsObj[id].code = text;
              console.log("problem code assigned");
            })
            .then(function() {
              problemsObj[id].codeSrc = `./problems/solutions/${id}.js`;
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
  script.src = problemsObj[id].codeSrc;
  script.async = false;
  script.onload = function() {
    executeBtn.onClick = function() {
      displayAnswer(window[`euler${id}`]());
    };
  };
  document.head.appendChild(script);
  statementDiv.children[1].innerHTML = problemsObj[id].statement;
  codeDiv.children[1].innerHTML = problemsObj[id].code;
  statementDiv.children[1].classList.remove("hidden");
  codeDiv.children[1].classList.remove("hidden");
  console.log("DOM filled with problem elements");
}

function displayAnswer(string) {
  outputDiv.textContent = string;
}

buildExpandos();
