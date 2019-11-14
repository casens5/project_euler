"use strict";

// crashes due to lack of memory somewhere between 5 million and 8 million.
// but good enough for the stated problem
// ... in firefox, at least.  apparently chromium won't quit so easily

function euler014(limit = 1000000) {
  function Node(length: number, pointer: number) {
    this.length = length;
    this.pointer = pointer;
  }

  function collatz(input: number) {
    if (input % 2 == 0) {
      return input / 2;
    } else {
      return 3 * input + 1;
    }
  }

  // number: (length until 1, pointer)
  let collatzTree = {
    1: new Node(0, null),
    2: new Node(1, 1),
    4: new Node(2, 2)
  };

  let longestRun = 4;

  let collatzCache: number[];

  function collatzRun(input: number) {
    if (collatzTree[input] === undefined) {
      // build a branch until we find the node it connects to
      collatzCache.push(input);
      collatzRun(collatz(input));
    } else {
      // add collatzCache as a tree branch
      let length = collatzTree[input].length;
      let pointer = input;
      collatzCache.reverse().forEach(function(node) {
        length++;
        collatzTree[node] = new Node(length, pointer);
        pointer = node;
      });
      // determine if this branch is the new longest
      if (collatzTree[longestRun].length < collatzTree[pointer].length) {
        longestRun = pointer;
      }
    }
  }

  // searches every integer in order, but collatzRun() can handle items that
  // are already in collatzTree
  for (let i = 3; i <= limit; i++) {
    collatzCache = [];
    collatzRun(i);
  }

  //return collatzTree;
  return longestRun;
}
