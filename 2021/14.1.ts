import { readFile } from "fs";

readFile("14.txt", (err, data) => {
  let [molecule, rulesStr] = data.toString().split("\n\n");
  const rules = new Map<string, string>(
    rulesStr.split("\n").map((v) => v.split(" -> ") as [string, string])
  );

  for (let i = 0; i < 10; i++) {
    let newMolecule = "";
    for (const [i, e] of [...molecule].entries()) {
      newMolecule += e;
      if (i === molecule.length - 1) break;
      newMolecule += rules.get(e + molecule.charAt(i + 1));
    }
    molecule = newMolecule;
  }

  const counts = new Map<string, number>();
  for (const c of molecule) {
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  let max = -1;
  let min = Number.MAX_VALUE;
  for (const v of counts.values()) {
    max = Math.max(max, v);
    min = Math.min(min, v);
  }
  console.log(max - min);
});
