import { readFile } from "fs";

readFile("2015/2.txt", (err, data) => {
  let area = 0;
  for (const [l, w, h] of data
    .toString()
    .split("\n")
    .map((l) => l.split("x").map((v) => +v))) {
    const sides = [l * w, w * h, h * l];
    area += sides.reduce((x, y) => x + y) * 2 + Math.min(...sides);
  }
  console.log(area);
});
