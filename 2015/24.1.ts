import {
  combinations,
  permutations,
  permutationsWithReplacement,
} from "combinatorial-generators";
import { readFile } from "fs";

readFile("2015/24.txt", (err, data) => {
  const pkgs = data
    .toString()
    .split("\n")
    .map((p) => +p);

  const target = pkgs.reduce((x, y) => x + y) / 3;

  let minInFrontCount = Infinity;
  let minQuantumEntanglement = Infinity;

  for (const perm of permutationsWithReplacement([false, true], pkgs.length)) {
    const front = pkgs.filter((p, i) => perm[i]);
    if (front.reduce((x, y) => x + y, 0) !== target) continue;
    const qe = front.reduce((x, y) => x * y, 1);
    if (front.length < minInFrontCount) {
      minInFrontCount = front.length;
      minQuantumEntanglement = Infinity;
    }
    if (front.length === minInFrontCount && qe < minQuantumEntanglement) {
      minQuantumEntanglement = qe;
    }
  }
  console.log(minQuantumEntanglement);
});
