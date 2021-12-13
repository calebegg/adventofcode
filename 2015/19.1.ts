import { readFile } from "fs";

readFile("2015/19.txt", (err, data) => {
  const [rules, molecule] = data.toString().split("\n\n");
  const distinct = new Set<string>();
  for (const rule of rules.split("\n")) {
    const [before, after] = rule.split(" => ");

    for (const match of molecule.matchAll(new RegExp(before, "g"))) {
      distinct.add(
        molecule.substring(0, match.index) +
          after +
          molecule.substring(match.index! + before.length)
      );
    }
  }
  console.log(distinct.size);
});
