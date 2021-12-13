import { readFile } from "fs";

const subject = new Map([
  ["children", 3],
  ["cats", 7],
  ["samoyeds", 2],
  ["pomeranians", 3],
  ["akitas", 0],
  ["vizslas", 0],
  ["goldfish", 5],
  ["trees", 3],
  ["cars", 2],
  ["perfumes", 1],
]);

readFile("2015/16.txt", (err, data) => {
  outer: for (const l of data.toString().split("\n")) {
    const [, num, statsStr] = l.match(/Sue (\d+): (.*)/)!;

    for (const [k, v] of statsStr
      .split(", ")
      .map((s) => s.split(": "))
      .map(([s, v]) => [s, +v] as const)) {
      if (subject.get(k) !== v) {
        continue outer;
      }
    }
    console.log(num);
  }
});
