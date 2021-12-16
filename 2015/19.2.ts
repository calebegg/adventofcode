import { readFile } from "fs";

readFile("2015/19.txt", (err, data) => {
  const [rulesStr, molecule] = data.toString().split("\n\n");
  const rules = rulesStr
    .split("\n")
    .map((l) => l.split(" => ") as [string, string]);

  let reduced = molecule;
  let steps = 0;
  while (reduced !== "e") {
    steps++;
    for (const [before, after] of rules) {
      if (reduced.includes(after)) {
        reduced = reduced.replace(after, before);
        break;
      }
    }
  }
  console.log(steps);
});
