"use strict";

function factorize(input) {
  let sqrt = Math.sqrt(input);
  let factors = {};
  for (let n = 2; n <= sqrt && input > 1; n++) {
    if (input % n == 0) {
      if (factors[n] == undefined) {
        factors[n] = 0;
      }
      factors[n]++;
      input = input / n;
      n--;
    }
  }
  if (factors[input] == undefined) {
    factors[input] = 0;
  }
  factors[input]++;
  return factors;
}

function accumulator(acc, item) {
  return acc * item[0] ** item[1];
}

function euler005(limit = 20) {
  let primes = {};
  for (let i = 2; i <= limit; i++) {
    let factors = factorize(i);
    Object.entries(factors).forEach(function(item) {
      if (primes[item[0]] == undefined || primes[item[0]] < item[1]) {
        primes[item[0]] = item[1];
      }
    });
  }
  return Object.entries(primes).reduce(accumulator, 1);
}
