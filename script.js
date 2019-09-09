"use strict";

const dom = {
  problemSelector: document.querySelector("#problemSelector"),
  statementDiv: document.querySelector("#statementDiv"),
  codeDiv: document.querySelector("#codeDiv"),
  dataDiv: document.querySelector("#dataDiv"),
  outputDiv: document.querySelector("#outputDiv"),
  output: document.querySelector("#output"),
  executeBtn: document.querySelector("#executeBtn"),
  clearBtn: document.querySelector("#clearBtn")
};

const problemsObj = {
  "---": {
    codeSrc: "null",
    statement: "<p>null</p>",
    code: "null",
    data: "null"
  }
};

dom.clearBtn.onclick = clearAnswer;

// event.target.value is a string
dom.problemSelector.addEventListener("change", function(event) {
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
    label.addEventListener("click", function(event) {
      toggleField(item, "toggle");
    });
  });
  dom.statementDiv.children[1].classList.add("no-vertical-padding");
  dom.codeDiv.children[1].classList.add("js");
}

// ten indents is too many god damn indents
function fetchProblem(id) {
  problemsObj[id] = {};
  fetch(`./problems/statements/${id}.html`).then(function(response) {
    let text = response
      .text()
      .then(function(text) {
        problemsObj[id].statement = text;
        //console.log("problem statement assigned:", id);
      })
      .then(function() {
        fetch(`./problems/solutions/${id}.js`).then(function(response) {
          let text = response
            .text()
            .then(function(text) {
              problemsObj[id].code = text;
              //console.log("problem code assigned");
            })
            .then(function() {
              problemsObj[id].codeSrc = `./problems/solutions/${id}.js`;
              //console.log("script assigned");
            })
            .then(function() {
              fetch(`./problems/data/${id}.txt`)
                .then(function(response) {
                  if (response.statusText == "File not found") {
                    problemsObj[id].data = "null";
                  } else {
                    let text = response.text().then(function(text) {
                      problemsObj[id].data = text;
                      //console.log("problem data evaluated");
                    });
                  }
                })
                .then(function() {
                  loadProblemElements(id);
                });
            });
        });
      });
  });
}

function toggleField(node, onOrOff) {
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
      dom.executeBtn.onclick = function() {
        displayAnswer(id);
      };
    };
    document.head.appendChild(script);
  } else {
    dom.executeBtn.onclick = function() {
      dom.output.textContent = "null";
    };
  }
  dom.statementDiv.children[1].innerHTML = problemsObj[id].statement;
  dom.codeDiv.children[1].innerHTML = problemsObj[id].code;
  dom.dataDiv.children[1].innerHTML = problemsObj[id].data;
  hljs.highlightBlock(dom.codeDiv.children[1]);
  toggleField(dom.statementDiv, "on");
  toggleField(dom.codeDiv, "on");
  toggleField(dom.dataDiv, "off");
  clearAnswer();
  //console.log("DOM filled with problem elements");
}

function displayAnswer(id) {
  dom.output.textContent = window[`euler${id}`]();
}

function clearAnswer() {
  dom.output.textContent = null;
}

//init
buildExpandos();
loadProblemElements("---");
toggleField(dom.statementDiv, "off");
toggleField(dom.codeDiv, "off");

let welcome = `hello there.
problems can be conveniently loaded from the console by typing \`go(id)\`,
then executed with \`euler{id}()\``;
console.log(welcome);
