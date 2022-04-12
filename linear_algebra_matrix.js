const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const A = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const B = [
  [6, 5],
  [4, 3],
  [2, 1],
];
const C = [
  [0, 0],
  [0, 0],
  [0, 0],
];

const operators = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  "*": function (a, b) {
    return a * b;
  },
  "/": function (a, b) {
    return a / b;
  }
};

// Single-responsibility principle (S.R.P.)
// matrix (3,2)
function ApplyOperatorMatrix(a, b, operator) {
  let i = 0;
  while (i < 3) {
    let j = 0;
    while (j < 2) {
      C[i][j] = Math.round((operators[operator](a[i][j], b[i][j]) + Number.EPSILON) * 100) / 100;
      j++;
    }
    i++;
  }
  return C;
}

var recursiveAsyncReadLine = function () {
  rl.question("Which operator you want to apply? ", function (operator) {
    if (typeof operators[operator] === "function") {
      console.table(ApplyOperatorMatrix(A, B, operator));
      recursiveAsyncReadLine();
    } else if (operator === "exit") {
      rl.close();
    } else {
      console.info("\n incorrect operator!");
      recursiveAsyncReadLine();
    }
  });
};

recursiveAsyncReadLine();

rl.on("close", function () {
  console.info("\nBYE BYE !!!");
  process.exit(0);
});
