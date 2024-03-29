"use strict";

function sumOfMultiples(limit, factor) {
  let sum = 0;
  limit = Math.ceil(limit / factor);
  for (let i = 0; i < limit; i++) {
    sum += i * factor;
  }
  return sum;
}

function euler001() {
  let threes = sumOfMultiples(1000, 3);
  let fives = sumOfMultiples(1000, 5);
  let fifteens = sumOfMultiples(1000, 15);
  let result = threes + fives - fifteens;
  return result;
}
