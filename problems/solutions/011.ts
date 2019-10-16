"use strict";

let g;

function euler010(limit = 2000000) {
  let primes = [];
  let primesToTest = [];
  let biggestPrimeIndex = -1;
  let currentSquare = 1;
  for (let i = 2; i < limit; i++) {
    if (
      primesToTest.every(item => {
        return i % item !== 0;
      })
    ) {
      primes.push(i);
    }
    if (i >= currentSquare) {
      biggestPrimeIndex++;
      currentSquare = primes[biggestPrimeIndex] ** 2;
      primesToTest.push(primes[biggestPrimeIndex]);
    }
  }
  const reducer = (acc, val) => acc + val;
  g = primes;
  return primes.reduce(reducer);
}
