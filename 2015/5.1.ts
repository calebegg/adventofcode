import { readFile } from "fs";

readFile("2015/5.txt", (err, data) => {
  console.log(
    data
      .toString()
      .split("\n")
      .filter((s) => {
        const hasThreeVowels = s.match(/.*[aeiou].*[aeiou].*[aeiou].*/);
        const hasDoubleLetter = s.match(/.*(.)\1.*/);
        const hasBannedString = s.match(/.*(ab|cd|pq|xy).*/);
        return hasThreeVowels && hasDoubleLetter && !hasBannedString;
      }).length
  );
});
