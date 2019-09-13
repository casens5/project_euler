"use strict";

function euler008(bigNum = problemsObj["008"].data) {
  let unbrokenString = bigNum.split("\n").join("");
  let removedZeroes = unbrokenString.split(/0+/);
  removedZeroes = removedZeroes.filter(string => string.length > 12);
  let greatestProduct = 1;

  const reducer = (acc, val) => {
    return acc * Number(val);
  };
  removedZeroes.forEach(function(string) {
    for (let i = 13; i <= string.length; i++) {
      let product = string
        .substring(i - 13, i)
        .split("")
        .reduce(reducer, 1);
      if (greatestProduct < product) {
        greatestProduct = product;
      }
    }
  });
  return greatestProduct;
}
