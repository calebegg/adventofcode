import { readFile } from "fs";

readFile("1.txt", (err, data) => {
  let prev = Number.MAX_VALUE;
  let increased = 0;
  const lines = data
    .toString()
    .split("\n")
    .map((line) => +line);
  for (let i = 0; i < lines.length - 2; i++) {
    const val = lines[i] + lines[i + 1] + lines[i + 2];
    if (val > prev) increased++;
    prev = val;
  }
  console.log(increased);
});
