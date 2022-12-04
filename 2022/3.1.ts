import { readFile } from "fs";

readFile("2022/3.txt", (err, data) => {
  const packs = data
    .toString()
    .split("\n")
    .map((p) => [p.substring(0, p.length / 2), p.substring(p.length / 2)]);
  let sum = 0;
  for (const [left, right] of packs) {
    for (const item of left) {
      if (right.includes(item)) {
        sum += priority(item);
        break;
      }
    }
  }
  console.log(sum);
});

function priority(item: string) {
  if (item.match(/[a-z]/)) {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else {
    return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
}
