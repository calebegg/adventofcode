import { readFile } from "fs";

readFile("15.txt", (err, data) => {
  const grid = data
    .toString()
    .split("\n")
    .map((row) => row.split("").map((v) => +v));

  const totalCost = new Map<string, number>();
  totalCost.set("0,0", 0);
  const visited = new Set<string>();

  while (true) {
    let next: string | null = null;
    let nextCost = Number.MAX_VALUE;
    for (const [r, row] of grid.entries()) {
      for (const c of row.keys()) {
        const cost = totalCost.get(`${r},${c}`);
        if (!visited.has(`${r},${c}`) && cost != undefined && cost < nextCost) {
          nextCost = cost;
          next = `${r},${c}`;
        }
      }
    }
    if (next === `${grid.length - 1},${grid[0].length - 1}`) {
      break;
    }
    visited.add(next!);
    const prevEntries = [...totalCost.entries()];
    for (const coords of visited) {
      const [r, c] = coords.split(",").map((v) => +v);

      for (const [rr, cc] of [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ]) {
        if (rr < 0 || rr > grid.length - 1 || cc < 0 || cc > grid.length - 1) {
          continue;
        }
        if (visited.has(`${rr},${cc}`)) continue;
        const total = totalCost.get(coords)! + grid[rr][cc];
        const prevTotal = totalCost.get(`${rr},${cc}`);
        if (prevTotal == undefined || total < prevTotal) {
          totalCost.set(`${rr},${cc}`, total);
        }
      }
    }
  }
  console.log(totalCost.get(`${grid.length - 1},${grid[0].length - 1}`));
});
