import { readFile } from "fs";

readFile("13.txt", (err, data) => {
  const paper = Array.from({ length: 2000 }, () =>
    Array.from({ length: 2000 }, () => false)
  );
  const [dots, instructions] = data.toString().split("\n\n");
  for (const [x, y] of dots
    .split("\n")
    .map((c) => c.split(",").map((x) => +x))) {
    paper[x][y] = true;
  }

  const [, axis, dimStr] = instructions
    .split("\n")[0]
    .match(/fold along (x|y)=(\d+)/)!;
  const dim = +dimStr;

  if (axis === "x") {
    for (let x = dim + 1; x < paper.length; x++) {
      for (let y = 0; y < paper[x].length; y++) {
        if (paper[x][y]) {
          paper[x][y] = false;
          paper[2 * dim - x][y] = true;
        }
      }
    }
  }

  console.log(
    paper.map((row) => row.filter((v) => v).length).reduce((x, y) => x + y)
  );
});
