import { readFile } from "fs";

readFile("9.txt", (err, data) => {
  const grid = data
    .toString()
    .split("\n")
    .map((l) => l.split("").map((d) => +d));
  let output = 0;
  for (const [r, row] of grid.entries()) {
    for (const [c, value] of row.entries()) {
      if (grid[r - 1]?.[c] != undefined && grid[r - 1][c] <= value) continue;
      if (grid[r + 1]?.[c] != undefined && grid[r + 1][c] <= value) continue;
      if (grid[r][c - 1] != undefined && grid[r][c - 1] <= value) continue;
      if (grid[r][c + 1] != undefined && grid[r][c + 1] <= value) continue;
      output += 1 + value;
    }
  }
  console.log(output);
});
