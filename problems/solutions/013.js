"use strict";
//even though the given input works without BigInt(), that's NOT GOOD MATH!!!  project euler you guys fucked up
var inputNums = problemsObj["013"].data.split("\n").map(function (x) { return BigInt(x); });
inputNums.pop();
function euler013(numsArray) {
    if (numsArray === void 0) { numsArray = inputNums; }
    var reducer = function (acc, val) { return acc + val; };
    var sum = numsArray.reduce(reducer);
    return String(sum).substring(0, 10);
}
