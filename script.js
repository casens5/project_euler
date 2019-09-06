"use strict";

const dom = {
  problemSelector: document.querySelector("#problemSelector"),
  statementDiv: document.querySelector("#statementDiv"),
  codeDiv: document.querySelector("#codeDiv"),
  dataDiv: document.querySelector("#dataDiv"),
  outputDiv: document.querySelector("#outputDiv"),
  executeBtn: document.querySelector("#executeBtn"),
  clearBtn: document.querySelector("#clearBtn")
};

const problemsObj = {
  "-": {
    codeSrc: null,
    statement: null,
    code: null,
    data: null
  }
};

dom.clearBtn.onclick = function() {
  displayAnswer(null);
};

dom.problemSelector.addEventListener("change", function(event) {
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
    let openBox = document.createElement("span");
    let text = document.createElement("span");
    item.show = true;
    content.classList = "content";
    label.classList = "label";
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
  dom.codeDiv.children[1].classList.add("code");
}

// ten indents is too many god damn indents
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
              fetch(`./problems/data/${id}.txt`)
                .then(function(response) {
                  if (response.statusText == "File not found") {
                    problemsObj[id].data = null;
                  } else {
                    let text = response.text().then(function(text) {
                      problemsObj[id].data = text;
                      console.log("problem data evaluated");
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
  let script = document.createElement("script");
  script.src = problemsObj[id].codeSrc;
  script.async = false;
  script.onload = function() {
    dom.executeBtn.onclick = function() {
      console.log("i am being clicked");
      displayAnswer(window[`euler${id}`]());
    };
  };
  document.head.appendChild(script);
  dom.statementDiv.children[1].innerHTML = problemsObj[id].statement;
  dom.codeDiv.children[1].innerHTML = problemsObj[id].code;
  toggleField(dom.statementDiv, "on");
  toggleField(dom.codeDiv, "on");
  toggleField(dom.dataDiv, "off");
  displayAnswer(null);
  console.log("DOM filled with problem elements");
}

function displayAnswer(string) {
  dom.outputDiv.textContent = string;
}

buildExpandos();
