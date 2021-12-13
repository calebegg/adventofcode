import { readFile } from "fs";

readFile("2015/5.txt", (err, data) => {
  console.log(
    data
      .toString()
      .split("\n")
      .filter((s) => {
        const hasDoublePair = s.match(/.*(..).*\1.*/);
        const hasSandwich = s.match(/.*(.).\1.*/);
        return hasDoublePair && hasSandwich;
      }).length
  );
});
