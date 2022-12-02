import { readFile } from "fs";

const SCORES = new Map([
  ["(", 1],
  ["[", 2],
  ["{", 3],
  ["<", 4],
]);

readFile("10.txt", (err, data) => {
  const lines = data.toString().split("\n");
  let scores: number[] = [];
  outer: for (const l of lines) {
    const stack: string[] = [];
    for (const c of l) {
      if ("([{<".includes(c)) {
        stack.push(c);
      } else {
        const match = stack.pop();
        if (match) {
          if ("([{<".indexOf(match) === ")]}>".indexOf(c)) {
            continue;
          } else {
            continue outer;
          }
        }
      }
    }
    let score = 0;
    for (const c of stack.reverse()) {
      score *= 5;
      score += SCORES.get(c)!;
    }
    scores.push(score);
  }
  console.log(scores.sort((a, b) => a - b)[(scores.length - 1) / 2]);
});
