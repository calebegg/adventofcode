import { readFile } from "fs";
import { combinationsWithReplacement } from "combinatorial-generators";

readFile("2015/15.txt", (err, data) => {
  const ing = new Map<string, Map<string, number>>();
  for (const l of data.toString().split("\n")) {
    const [name, scoresStr] = l.split(": ");
    const scores = scoresStr.split(", ").map((s) => s.split(" "));
    ing.set(name, new Map(scores.map(([k, v]) => [k, +v])));
  }
  for (const v of ing.values()) {
    v.delete("calories");
  }
  let best = 0;
  for (const c of combinationsWithReplacement(ing.keys(), 100)) {
    const vals = new Map<string, number>(ing.values().next().value);
    for (const k of vals.keys()) {
      vals.set(k, 0);
    }
    for (const i of c) {
      for (const k of vals.keys()) {
        vals.set(k, vals.get(k)! + ing.get(i)!.get(k)!);
      }
    }
    const value = [...vals.values()]
      .map((v) => (v < 0 ? 0 : v))
      .reduce((x, y) => x * y);
    if (value > best) {
      best = value;
    }
  }
  console.log(best);
});
