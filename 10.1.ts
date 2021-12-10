import { readFile } from "fs";

const SCORES = new Map([
  [")", 3],
  ["]", 57],
  ["}", 1197],
  [">", 25137],
]);

readFile("10.txt", (err, data) => {
  const lines = data.toString().split("\n");
  const stack = [];
  let score = 0;
  outer: for (const l of lines) {
    for (const c of l) {
      if ("([{<".includes(c)) {
        stack.push(c);
      } else {
        if (stack.length === 0) continue outer;
        const match = stack.pop();
        switch (c) {
          case ")":
            if (match !== "(") score += SCORES.get(c)!;
            break;
          case "]":
            if (match !== "[") score += SCORES.get(c)!;
            break;
          case "}":
            if (match !== "{") score += SCORES.get(c)!;
            break;
          case ">":
            if (match !== "<") score += SCORES.get(c)!;
            break;
        }
      }
    }
  }
  console.log(score);
});
