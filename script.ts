"use strict";

function $(id) {
  return document.getElementById(id);
}

const problemsObj = {
  "---": {
    codeSrc: "null",
    statement: "<p>null</p>",
    code: "null",
    data: "null"
  }
};

$("clearBtn").onclick = clearAnswer;

$("problemSelector").addEventListener("change", function(event) {
  loadProblem(event.target.value); // event.target.value is a string
});

// an alias for command line usage
function go(problem) {
  loadProblem(problem);
}

function loadProblem(problem) {
  //console.log("switch to problem ", problem);
  problem = String(problem).padStart(3, "0");
  // only use the fetch API if we haven't already
  if (problemsObj[problem] === undefined) {
    fetchProblem(problem);
  } else {
    loadProblemElements(problem);
  }
}

function fetchProblem(id) {
  problemsObj[id] = {};
  fetch(`./problems/statements/${id}.html`).then(function(res) {
    let text = res.text().then(function(text) {
      problemsObj[id].statement = text;
      fetch(`./problems/solutions/${id}.js`).then(function(res) {
        let text = res.text().then(function(text) {
          problemsObj[id].code = text;
          problemsObj[id].codeSrc = `./problems/solutions/${id}.js`;
          fetch(`./problems/data/${id}.txt`).then(function(res) {
            let text = res
              .text()
              .then(function(text) {
                if (res.ok) {
                  problemsObj[id].data = text;
                } else {
                  problemsObj[id].data = "null";
                }
              })
              .then(function() {
                loadProblemElements(id);
              });
          });
        });
      });
    });
  });
}

function loadProblemElements(id) {
  if (id !== "---") {
    let script = document.createElement("script");
    document.head.appendChild(script);
    script.src = problemsObj[id].codeSrc;
    script.async = false;
    script.onload = function() {
      $("executeBtn").onclick = function() {
        displayAnswer(id);
      };
    };
  } else {
    // turn off functionality in the null page
    $("executeBtn").onclick = function() {
      $("output").textContent = "null";
    };
  }
  $("statementDiv").querySelector(".content").innerHTML =
    problemsObj[id].statement;
  $("codeDiv").querySelector(".content").innerHTML = problemsObj[id].code;
  $("dataDiv").querySelector(".content").innerHTML = problemsObj[id].data;
  hljs.highlightBlock($("codeDiv").querySelector(".content"));
  toggleField($("statementDiv"), "on");
  toggleField($("codeDiv"), "on");
  toggleField($("dataDiv"), "off");
  clearAnswer();
  //console.log("DOM filled with problem elements");
}

function addExpandoListeners() {
  let targets = document.querySelectorAll(".expando");
  targets.forEach(function(item) {
    item.querySelector(".label").addEventListener("click", function() {
      toggleField(item);
    });
  });
}

function toggleField(node, onOrOff = "toggle") {
  if (onOrOff == "toggle") {
    if (node.show) {
      onOrOff = "off";
    } else {
      onOrOff = "on";
    }
  }
  if (onOrOff == "on") {
    node.show = true;
    node.querySelector("span > .open-box").textContent = "[-]";
    node.querySelector(".content").classList.remove("hidden");
  } else {
    node.show = false;
    node.querySelector("span > .open-box").textContent = "[+]";
    node.querySelector(".content").classList.add("hidden");
  }
}

function displayAnswer(id) {
  $("output").textContent = window[`euler${id}`]();
}

function clearAnswer() {
  $("output").textContent = null;
}

//init
addExpandoListeners();
loadProblemElements("---");
toggleField($("statementDiv"), "off");
toggleField($("codeDiv"), "off");

console.log(`hello there.
problems can be conveniently loaded from the console by typing \`go(id)\`,
then executed with \`euler{id}()\``);
