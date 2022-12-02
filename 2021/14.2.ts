import { readFile } from "fs";

readFile("14.txt", (err, data) => {
  let [molecule, rulesStr] = data.toString().split("\n\n");
  const rules = new Map<string, string>(
    rulesStr.split("\n").map((v) => v.split(" -> ") as [string, string])
  );

  let pairs = new Map<string, number>();

  for (const [i, e] of [...molecule].entries()) {
    if (i === molecule.length - 1) break;
    const pair = e + molecule.charAt(i + 1);
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
  }

  for (let i = 0; i < 40; i++) {
    let newPairs = new Map<string, number>();
    for (const [pair, amount] of pairs.entries()) {
      const left = pair.charAt(0) + rules.get(pair);
      const right = rules.get(pair) + pair.charAt(1);
      newPairs.set(left, (newPairs.get(left) ?? 0) + amount);
      newPairs.set(right, (newPairs.get(right) ?? 0) + amount);
    }
    pairs = newPairs;
  }

  const counts = new Map<string, number>();
  for (const [pair, amount] of pairs.entries()) {
    counts.set(pair.charAt(0), (counts.get(pair.charAt(0)) ?? 0) + amount);
  }
  const lastElement = molecule.charAt(molecule.length - 1);
  counts.set(lastElement, (counts.get(lastElement) ?? 0) + 1);
  let max = -1;
  let min = Number.MAX_VALUE;
  for (const v of counts.values()) {
    max = Math.max(max, v);
    min = Math.min(min, v);
  }
  console.log(max - min);
});
