"use strict";

//even though the given input works without BigInt(), that's NOT GOOD MATH!!!  project euler you guys fucked up

let inputNums = problemsObj["013"].data.split("\n").map(x => BigInt(x));

inputNums.pop();

function euler013(numsArray: number[] = inputNums) {
  const reducer = (acc, val) => acc + val;
  let sum = numsArray.reduce(reducer);
  return String(sum).substring(0, 10);
}
