import { readFile } from "fs";
import PriorityQueue from "priorityqueuejs";

interface Node {
  r: number;
  c: number;
}

readFile("15.txt", (err, data) => {
  const small = data
    .toString()
    .split("\n")
    .map((row) => row.split("").map((v) => +v));

  const grid = Array.from({ length: 5 * small.length }, (_, r) =>
    Array.from({ length: 5 * small[0].length }, (_, c) => {
      const amt =
        small[r % small.length][c % small[0].length] +
        Math.floor(r / small.length) +
        Math.floor(c / small[0].length);
      return amt > 9 ? (amt % 10) + 1 : amt;
    })
  );

  const fScore = Array.from(grid, (row) => Array.from(row, () => Infinity));
  const gScore = Array.from(grid, (row) => Array.from(row, () => Infinity));
  const queue = new PriorityQueue<Node>(
    (x, y) => fScore[y.r][y.c] - fScore[x.r][x.c]
  );
  queue.enq({ r: 0, c: 0 });
  fScore[0][0] = grid.length + grid[0].length;
  gScore[0][0] = 0;

  while (!queue.isEmpty()) {
    const current = queue.deq();
    if (current.r === grid.length - 1 && current.c === grid[0].length - 1) {
      break;
    }
    for (const [r, c] of [
      [current.r + 1, current.c],
      [current.r, current.c + 1],
      [current.r - 1, current.c],
      [current.r, current.c - 1],
    ]) {
      if (r < 0 || c < 0 || r > grid.length - 1 || c > grid[0].length) {
        continue;
      }
      const maybeG = gScore[current.r][current.c] + grid[r][c];
      if (maybeG < gScore[r][c]) {
        gScore[r][c] = maybeG;
        fScore[r][c] = maybeG + grid.length - r + grid[0].length - c;
        let alreadyHas = false;
        queue.forEach((v) => {
          if (v.r === r && v.c === c) alreadyHas = true;
        });
        if (!alreadyHas) queue.enq({ r, c });
      }
    }
  }

  console.log(gScore[grid.length - 1][grid[0].length - 1]);
});
