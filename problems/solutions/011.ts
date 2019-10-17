"use strict";

// this is general and DRY, but i hate the loop at line 35
// but hey at least pathLength can be 0 or negative!

// let bee: number[][];
// let joe = [[0, 0], [1, 1], [2, 2], [3, 3]];
// let bob = [[6, 8], [7, 9], [8, 10], [9, 11]];
// let hey: any;
//
// function read(arrArr: number[][], path: number[][]) {
//   let result = [];
//   path.forEach(function(point) {
//     result.push(arrArr[point[0]][point[1]]);
//   });
//   return result;
// }

function pathMultiply(arrArr: number[][], path: number[][]) {
  let product = 1;
  path.forEach(function(point) {
    product *= arrArr[point[0]][point[1]];
  });
  return product;
}

function euler011(bigInput = problemsObj["011"].data, pathLength = 4) {
  // this makes the code DRY, but at what price?
  function searchGrid(
    limitI: number,
    limitJ: number,
    incrementI: number,
    incrementJ: number,
    startI = 0,
    startJ = 0
  ) {
    let i: number;
    let j: number;
    let path: number[][] = [];
    for (i = startI; i < limitI; i++) {
      for (j = startJ; j < limitJ; j++) {
        // there's got to be a better way
        for (let n = 0; n < pathLength; n++) {
          path.push([i + incrementI * n, j + incrementJ * n]);
        }
        let product = pathMultiply(bigArrArr, path);
        largestProduct.update(product, path);
        // yeah this sucks
        path = [];
      }
    }
  }

  let bigArray = bigInput.split("\n");
  let bigArrArr = bigArray.map((element: string) => {
    let arr = element.split(" ");
    return arr.map(item => Number(item));
  });
  // not sure if this object is good or not
  let largestProduct = {
    value: 0,
    path: [],
    update: (product, path) => {
      if (largestProduct.value < product) {
        largestProduct.value = product;
        largestProduct.path = path;
      }
    }
  };
  let limitI: number;
  let limitJ: number;
  let grid = {
    length: bigArrArr.length,
    width: bigArrArr[0].length
  };

  // west to east
  limitI = grid.length;
  limitJ = grid.width - (pathLength - 1);
  searchGrid(limitI, limitJ, 0, 1);

  // north to south
  limitI = grid.length - (pathLength - 1);
  limitJ = grid.width;
  searchGrid(limitI, limitJ, 1, 0);

  // NW to SE
  limitI = grid.length - (pathLength - 1);
  limitJ = grid.width - (pathLength - 1);
  searchGrid(limitI, limitJ, 1, 1);

  // NE to SW
  limitI = grid.length - (pathLength - 1);
  limitJ = grid.width;
  searchGrid(limitI, limitJ, 1, -1, 0, pathLength - 1);

  // bee = bigArrArr;
  // hey = largestProduct;
  return largestProduct.value;
}
