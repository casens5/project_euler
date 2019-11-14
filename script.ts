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

// event.target.value is a string
$("problemSelector").addEventListener("change", function(event) {
  go(event.target.value);
});

function go(problem) {
  //console.log("switch to problem ", problem);
  problem = String(problem).padStart(3, "0");
  if (problemsObj[problem] === undefined) {
    fetchProblem(problem);
  } else {
    loadProblemElements(problem);
  }
}

function buildExpandos() {
  let targets = document.querySelectorAll(".expando");
  let labels = ["problem", "data", "code"];
  targets.forEach(function(item) {
    let label = document.createElement("span");
    let content = document.createElement("div");
    if (item.id == "codeDiv" || item.id == "dataDiv") {
      content = document.createElement("pre");
      let inner = document.createElement("code");
      content.appendChild(inner);
      content.classList.add("code");
    }
    let openBox = document.createElement("span");
    let text = document.createElement("span");
    item.show = true;
    content.classList = "content";
    label.classList = "purple";
    openBox.classList = "open-box";
    text.textContent = labels.shift();
    openBox.textContent = "[-]";
    item.appendChild(label);
    item.appendChild(content);
    label.appendChild(openBox);
    label.appendChild(text);
    label.addEventListener("click", function() {
      toggleField(item);
    });
  });
  $("statementDiv").children[1].classList.add("no-vertical-padding");
  $("codeDiv").children[1].classList.add("js");
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
    node.children[0].children[0].textContent = "[-]";
    node.children[1].classList.remove("hidden");
  } else {
    node.show = false;
    node.children[0].children[0].textContent = "[+]";
    node.children[1].classList.add("hidden");
  }
}

function loadProblemElements(id) {
  if (id !== "---") {
    let script = document.createElement("script");
    script.src = problemsObj[id].codeSrc;
    script.async = false;
    script.onload = function() {
      $("executeBtn").onclick = function() {
        displayAnswer(id);
      };
    };
    document.head.appendChild(script);
  } else {
    $("executeBtn").onclick = function() {
      $("output").textContent = "null";
    };
  }
  $("statementDiv").children[1].innerHTML = problemsObj[id].statement;
  $("codeDiv").children[1].innerHTML = problemsObj[id].code;
  $("dataDiv").children[1].innerHTML = problemsObj[id].data;
  hljs.highlightBlock($("codeDiv").children[1]);
  document.querySelectorAll(".open").forEach(function(item) {
    item.addEventListener("click", function(event) {
      toggleField(dom[event.target.dataset.open], "on");
    });
  });
  toggleField($("statementDiv"), "on");
  toggleField($("codeDiv"), "on");
  toggleField($("dataDiv"), "off");
  clearAnswer();
  //console.log("DOM filled with problem elements");
}

function displayAnswer(id) {
  $("output").textContent = window[`euler${id}`]();
}

function clearAnswer() {
  $("output").textContent = null;
}

//init
buildExpandos();
loadProblemElements("---");
toggleField($("statementDiv"), "off");
toggleField($("codeDiv"), "off");

let welcome = `hello there.
problems can be conveniently loaded from the console by typing \`go(id)\`,
then executed with \`euler{id}()\``;
console.log(welcome);
