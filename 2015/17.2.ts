import { readFile } from "fs";
import { combinations } from "combinatorial-generators";

readFile("2015/17.txt", (err, data) => {
  const containers = data
    .toString()
    .split("\n")
    .map((v) => +v);

  let count = 0;
  for (let i = 1; i < containers.length; i++) {
    count += [...combinations(containers, i)].filter(
      (p) => p.reduce((x, y) => x + y) === 150
    ).length;
    if (count > 0) break;
  }
  console.log(count);
});
