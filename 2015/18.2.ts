import { readFile } from "fs";

readFile("2015/18.txt", (err, data) => {
  let grid = data
    .toString()
    .split("\n")
    .map((l) => [...l].map((c) => c === "#"));

  for (let i = 0; i < 100; i++) {
    const grid2 = [...grid.map((row) => [...row])];
    grid2[0][0] = true;
    grid2[grid2.length - 1][0] = true;
    grid2[grid2.length - 1][grid2[0].length - 1] = true;
    grid2[0][grid2[0].length - 1] = true;
    for (const [r, row] of grid.entries()) {
      for (const [c, l] of row.entries()) {
        if (r === 0 && c === 0) continue;
        if (r === grid2.length - 1 && c === 0) continue;
        if (r === grid2.length - 1 && c === grid2[0].length - 1) continue;
        if (r === 0 && c === grid2[0].length - 1) continue;
        const lit = [
          grid[r - 1]?.[c - 1],
          grid[r - 1]?.[c],
          grid[r - 1]?.[c + 1],
          grid[r][c - 1],
          grid[r][c + 1],
          grid[r + 1]?.[c - 1],
          grid[r + 1]?.[c],
          grid[r + 1]?.[c + 1],
        ].filter((v) => v).length;
        if (l) {
          grid2[r][c] = lit === 2 || lit === 3;
        } else {
          grid2[r][c] = lit === 3;
        }
      }
    }
    grid = grid2;
  }
  console.log(grid.flat().filter((v) => v).length);
});
