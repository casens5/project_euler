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
function pathMultiply(arrArr, path) {
    var product = 1;
    path.forEach(function (point) {
        product *= arrArr[point[0]][point[1]];
    });
    return product;
}
function euler011(bigInput, pathLength) {
    if (bigInput === void 0) { bigInput = problemsObj["011"].data; }
    if (pathLength === void 0) { pathLength = 4; }
    // this makes the code DRY, but at what price?
    function searchGrid(limitI, limitJ, incrementI, incrementJ, startI, startJ) {
        if (startI === void 0) { startI = 0; }
        if (startJ === void 0) { startJ = 0; }
        var i;
        var j;
        var path = [];
        for (i = startI; i < limitI; i++) {
            for (j = startJ; j < limitJ; j++) {
                // there's got to be a better way
                for (var n = 0; n < pathLength; n++) {
                    path.push([i + incrementI * n, j + incrementJ * n]);
                }
                var product = pathMultiply(bigArrArr, path);
                largestProduct.update(product, path);
                // yeah this sucks
                path = [];
            }
        }
    }
    var bigArray = bigInput.split("\n");
    var bigArrArr = bigArray.map(function (element) {
        var arr = element.split(" ");
        return arr.map(function (item) { return Number(item); });
    });
    // not sure if this object is good or not
    var largestProduct = {
        value: 0,
        path: [],
        update: function (product, path) {
            if (largestProduct.value < product) {
                largestProduct.value = product;
                largestProduct.path = path;
            }
        }
    };
    var limitI;
    var limitJ;
    var grid = {
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
