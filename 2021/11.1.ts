import { readFile } from "fs";

readFile("11.txt", (err, data) => {
  const grid = data
    .toString()
    .split("\n")
    .map((l) => [...l].map((c) => +c));

  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    const flashed = Array.from(grid, (row) => Array.from(row, () => false));

    const flash = (r: number, c: number) => {
      if (flashed[r][c]) return;
      flashed[r][c] = true;
      flashes++;
      for (
        let dr = Math.max(r - 1, 0);
        dr <= Math.min(r + 1, grid.length - 1);
        dr++
      ) {
        for (
          let dc = Math.max(c - 1, 0);
          dc <= Math.min(c + 1, grid[r].length - 1);
          dc++
        ) {
          grid[dr][dc]++;
          if (grid[dr][dc] >= 10) {
            flash(dr, dc);
          }
        }
      }
    };

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        grid[r][c]++;
        if (grid[r][c] >= 10) {
          flash(r, c);
        }
      }
    }

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] >= 10) grid[r][c] = 0;
      }
    }
  }
  console.log(flashes);
});
