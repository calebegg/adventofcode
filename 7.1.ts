import { readFile } from "fs";

readFile("7.txt", (err, data) => {
  const positions = data
    .toString()
    .split(",")
    .map((p) => +p);
  const max = Math.max(...positions);
  let minCost = Number.MAX_VALUE;
  for (let i = 0; i < max; i++) {
    const cost = positions.map((p) => Math.abs(p - i)).reduce((x, y) => x + y);
    if (cost < minCost) {
      minCost = cost;
    }
  }
  console.log(minCost);
});
