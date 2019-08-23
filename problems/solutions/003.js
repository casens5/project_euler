"use strict";

function euler003(inputNum = 600851475143) {
  let factors = [];
  let limit = Math.ceil(Math.sqrt(inputNum)) + 1;
  for (let i = 2; i < limit; i++) {
    if (inputNum % i == 0) {
      factors.push(i);
      inputNum /= i;
      limit = Math.ceil(Math.sqrt(inputNum)) + 1;
      i -= 1;
    }
  }
  console.log(inputNum);
  displayResult(inputNum);
}
