"use strict";

function euler006(limit = 100) {
  let arr = Array.from({ length: limit }, (v, i) => i + 1);
  let sqOfSum = arr.reduce((a, v) => a + v) ** 2;
  let sumOfSq = arr.reduce((a, v) => a + v ** 2);
  return sqOfSum - sumOfSq;
}
