import { readFile } from "fs";

readFile("9.txt", (err, data) => {
  const grid = data
    .toString()
    .split("\n")
    .map((l) => l.split("").map((d) => +d));

  function findBasinSize(
    value: number,
    r: number,
    c: number,
    visited: Set<string>
  ): number {
    if (
      visited.has(`${r},${c}`) ||
      grid[r]?.[c] == undefined ||
      grid[r][c] === 9
    ) {
      return 0;
    }
    visited.add(`${r},${c}`);
    return (
      1 +
      findBasinSize(value, r - 1, c, visited) +
      findBasinSize(value, r + 1, c, visited) +
      findBasinSize(value, r, c - 1, visited) +
      findBasinSize(value, r, c + 1, visited)
    );
  }

  let output = 0;
  const basinSizes: number[] = [];
  for (const [r, row] of grid.entries()) {
    for (const [c, value] of row.entries()) {
      if (grid[r - 1]?.[c] != undefined && grid[r - 1][c] <= value) continue;
      if (grid[r + 1]?.[c] != undefined && grid[r + 1][c] <= value) continue;
      if (grid[r][c - 1] != undefined && grid[r][c - 1] <= value) continue;
      if (grid[r][c + 1] != undefined && grid[r][c + 1] <= value) continue;
      basinSizes.push(findBasinSize(value, r, c, new Set()));
      basinSizes.sort();
      if (basinSizes.length > 3) basinSizes.shift();
    }
  }
  console.log(basinSizes.reduce((a, b) => a * b));
});
