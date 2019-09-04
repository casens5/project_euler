"use strict";

function reverse(s) {
  return s
    .split("")
    .reverse()
    .join("");
}

function euler004() {
  let stop = false;
  let product;
  let numA;
  let numB;
  let pal;
  for (pal = 999; stop == false; pal--) {
    product = Number(String(pal) + reverse(String(pal)));
    let subStop = false;
    for (numA = 999; subStop == false; numA--) {
      numB = product / numA;
      if (numB > 1000 || numB >= numA) {
        subStop = true;
      }
      if (product % numA == 0 && numB < 1000) {
        subStop = true;
        stop = true;
      }
    }
  }
  return product;
}
