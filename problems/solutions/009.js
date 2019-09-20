"use strict";

function euler009(sum = 1000) {
  let a = 3;
  let b = 4;
  let c;
  while (true) {
    c = sum - (a + b);
    if (c ** 2 == a ** 2 + b ** 2) {
      break;
    }
    b++;
    // meta-level increment
    if (b >= c) {
      a++;
      b = a + 1;
      // in case there exists no a**2 + b**2 == c**2
      if (a >= c + 1) {
        a = null;
        b = null;
        c = null;
        break;
      }
    }
  }
  console.log(a, b, c);
  return a * b * c;
}
