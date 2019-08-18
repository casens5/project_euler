'use strict'

function sumOfMultiples(limit, factor) {
  let sum = 0;
  limit = Math.ceil(limit/factor);
  let i = 0;
  while (i < limit) {
    sum += i*factor
    i++
  }
  return sum
}

function euler001() {
	let threes = sumOfMultiples(1000, 3);
	let fives = sumOfMultiples(1000, 5);
	let fifteens = sumOfMultiples(1000, 15);
	console.log(threes + fives - fifteens);
}
