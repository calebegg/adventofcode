import {
  permutations,
  permutationsWithReplacement,
} from "combinatorial-generators";
import { readFile } from "fs";

readFile("19.txt", (_, data) => {
  const scans = data
    .toString()
    .split("\n\n")
    .map((b) =>
      b
        .split("\n")
        .filter((_, i) => i !== 0)
        .map((l) => l.split(",").map((n) => +n))
    );
  const ref = scans.shift()!;
  while (scans.length > 0) {
    outer: for (const [i, scan] of scans.entries()) {
      for (const [xi, yi, zi] of permutations([0, 1, 2])) {
        for (const [xs, ys] of permutationsWithReplacement([-1, 1], 2)) {
          let zs = xs * ys;
          if (
            (xi === 1 && yi === 0) ||
            (xi === 2 && yi === 1) ||
            (xi === 0 && yi === 2)
          ) {
            zs = -zs;
          }
          for (const from of scan) {
            for (const to of ref) {
              const inCommon = ref.filter((r) =>
                scan.some((s) => {
                  return (
                    xs * s[xi] - xs * from[xi] + to[0] === r[0] &&
                    ys * s[yi] - ys * from[yi] + to[1] === r[1] &&
                    zs * s[zi] - zs * from[zi] + to[2] === r[2]
                  );
                })
              ).length;
              if (inCommon >= 12) {
                for (const s of scan) {
                  const x = xs * s[xi] - xs * from[xi] + to[0];
                  const y = ys * s[yi] - ys * from[yi] + to[1];
                  const z = zs * s[zi] - zs * from[zi] + to[2];
                  if (
                    !ref.find((r) => x === r[0] && y === r[1] && z === r[2])
                  ) {
                    ref.push([x, y, z]);
                  }
                }
                scans.splice(i, 1);
                break outer;
              }
            }
          }
        }
      }
    }
  }
  console.log(ref.length);
});
