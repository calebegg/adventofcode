import { readFile } from "fs";

readFile("2015/2.txt", (err, data) => {
  let length = 0;
  for (const [l, w, h] of data
    .toString()
    .split("\n")
    .map((l) => l.split("x").map((v) => +v))) {
    const perimeters = [2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l];
    length += Math.min(...perimeters) + l * w * h;
  }
  console.log(length);
});
