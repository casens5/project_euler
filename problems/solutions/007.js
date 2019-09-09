"use strict";

let primes = [];

function euler007(limit = 10001) {
  for (let i = 2; primes.length < limit; i++) {
    if (
      primes.every(function(item) {
        return i % item !== 0;
      })
    ) {
      primes.push(i);
    }
  }
  return primes[limit - 1];
}
