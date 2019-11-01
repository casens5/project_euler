"use strict";
function findDivisors(dividend) {
    var divisors = 2;
    // let arr = [1, dividend];
    var sqrt = Math.floor(Math.sqrt(dividend));
    for (var i = 2; i <= sqrt; i++) {
        if (dividend % i === 0) {
            divisors += 2;
            // arr.push(i);
            // arr.push(dividend / i);
        }
    }
    if (sqrt === Math.sqrt(dividend)) {
        divisors--;
        // arr.pop();
    }
    // console.log(arr.sort((a, b) => a - b));
    return divisors;
}
function tri(num) {
    return (num * (num + 1)) / 2;
}
function euler012(limit) {
    if (limit === void 0) { limit = 500; }
    var divisors;
    var i = 1;
    for (null; i < 20000; i++) {
        divisors = findDivisors(tri(i));
        if (divisors >= limit) {
            break;
        }
    }
    return tri(i);
}
