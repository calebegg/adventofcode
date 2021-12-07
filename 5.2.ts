import { readFile } from "fs";

readFile("5.txt", (err, data) => {
  const lines = data.toString().split("\n");
  const field = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );
  for (const line of lines) {
    let [[x1, y1], [x2, y2]] = line
      .split(" -> ")
      .map((p) => p.split(",").map((c) => +c));
    if (x1 === x2) {
      for (let y = y1; y1 < y2 ? y <= y2 : y >= y2; y += y1 < y2 ? 1 : -1) {
        field[x1][y]++;
      }
    } else if (y1 === y2) {
      for (let x = x1; x1 < x2 ? x <= x2 : x >= x2; x += x1 < x2 ? 1 : -1) {
        field[x][y1]++;
      }
    } else {
      for (
        let x = x1, y = y1;
        x1 < x2 ? x <= x2 : x >= x2;
        x += x1 < x2 ? 1 : -1, y += y1 < y2 ? 1 : -1
      ) {
        field[x][y]++;
      }
    }
  }
  console.log(field.flat().filter((v) => v >= 2).length);
});
