function multiplyLoop(limit, factor) {
  let sum = 0;
  limit = Math.ceil(limit/factor);
  let i = 0;
  while (i < limit) {
    sum += i*factor
    i++
  }
  return sum
}

let threes = multiplyLoop(1000, 3);
let fives = multiplyLoop(1000, 5);
let fifteens = multiplyLoop(1000, 15);

console.log(threes + fives - fifteens);
