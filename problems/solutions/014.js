"use strict";
//crashes due to lack of memory somewhere between 5 million and 8 million.  but good enough for the stated problem
// ... in firefox, at least.  apparently chromium won't quit so easily
function euler014(limit) {
    if (limit === void 0) { limit = 1000000; }
    function Node(length, pointer) {
        this.length = length;
        this.pointer = pointer;
    }
    function collatz(input) {
        if (input % 2 == 0) {
            return input / 2;
        }
        else {
            return 3 * input + 1;
        }
    }
    var collatzTree = new Object();
    collatzTree[1] = new Node(0, null);
    collatzTree[2] = new Node(1, 1);
    collatzTree[4] = new Node(2, 2);
    var longestRun = 4;
    var collatzCache;
    function collatzRun(input) {
        if (collatzTree[input] === undefined) {
            // build a branch until we find the node it connects to
            collatzCache.push(input);
            collatzRun(collatz(input));
        }
        else {
            // add the collatz cache as a tree branch
            var length_1 = collatzTree[input].length;
            var pointer_1 = input;
            collatzCache.reverse().forEach(function (node) {
                length_1++;
                collatzTree[node] = new Node(length_1, pointer_1);
                pointer_1 = node;
            });
            // determine if this branch is the new longest
            if (collatzTree[longestRun].length < collatzTree[pointer_1].length) {
                longestRun = pointer_1;
            }
        }
    }
    // searches every integer in order, but collatzRun() can handle items that are already in collatzTree
    for (var i = 3; i < limit; i++) {
        collatzCache = [];
        collatzRun(i);
    }
    //return collatzTree;
    return longestRun;
}
