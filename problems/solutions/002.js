"use strict";

function euler002(limit = 4000000) {
  let sequence = [0, 1];
  let sumOfEvens = 0;
	let num;
  for (let i = 1; sequence[i] < limit; i++) {
		num = sequence[i - 1] + sequence[i]
    sequence.push(num);
    if (num % 2 == 0) {
      sumOfEvens += num;
    }
  }
  displayResult(sumOfEvens);
  console.log(sumOfEvens);
}
