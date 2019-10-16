"use strict";
function euler010(limit) {
    if (limit === void 0) { limit = 2000000; }
    var primes = [];
    var primesToTest = [];
    var biggestPrimeIndex = -1;
    var currentSquare = 1;
    var _loop_1 = function (i) {
        if (primesToTest.every(function (item) {
            return i % item !== 0;
        })) {
            primes.push(i);
        }
        if (i >= currentSquare) {
            biggestPrimeIndex++;
            currentSquare = Math.pow(primes[biggestPrimeIndex], 2);
            primesToTest.push(primes[biggestPrimeIndex]);
        }
    };
    for (var i = 2; i < limit; i++) {
        _loop_1(i);
    }
    var reducer = function (acc, val) { return acc + val; };
    return primes.reduce(reducer);
}
