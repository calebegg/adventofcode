import { readFile } from "fs";
import { permutations } from "combinatorial-generators";

readFile("2015/13.txt", (err, data) => {
  const guests = new Set<string>();
  const scores = new Map<string, Map<string, number>>();
  for (const l of data.toString().split("\n")) {
    const [_, a, change, scoreStr, b] = l.match(
      /^(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+).$/
    )!;
    const score = (change === "lose" ? -1 : 1) * +scoreStr;
    guests.add(a);
    guests.add(b);
    let map = scores.get(a);
    if (!map) map = new Map();
    map.set(b, score);
    scores.set(a, map);
  }
  guests.add("self");
  scores.set("self", new Map());

  let best = -Number.MAX_VALUE;

  for (const arrangement of permutations(guests)) {
    let value = 0;
    for (const [i, guest] of arrangement.entries()) {
      value +=
        (scores
          .get(guest)!
          .get(arrangement[i === arrangement.length - 1 ? 0 : i + 1]) ?? 0) +
        (scores.get(guest)!.get(arrangement.at(i - 1)!) ?? 0);
    }
    if (value > best) best = value;
  }
  console.log(best);
});
