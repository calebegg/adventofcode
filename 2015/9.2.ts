import { readFile } from "fs";
import { permutations } from "combinatorial-generators";

readFile("2015/9.txt", (err, data) => {
  const costs = new Map<string, number>();
  const keys = new Set<string>();
  for (const [_, from, to, costStr] of data
    .toString()
    .split("\n")
    .map((l) => l.match(/^(.*) to (.*) = (.*)/)!)) {
    const cost = +costStr;
    costs.set(`${from},${to}`, cost);
    costs.set(`${to},${from}`, cost);
    keys.add(from);
    keys.add(to);
  }
  let maxCost = 0;
  for (const order of permutations(keys)) {
    let cost = 0;
    for (let i = 0; i < order.length - 1; i++) {
      cost += costs.get(`${order[i]},${order[i + 1]}`)!;
    }
    if (cost > maxCost) maxCost = cost;
  }
  console.log(maxCost);
});
