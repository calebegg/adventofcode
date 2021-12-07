import { readFile } from "fs";

readFile("1.txt", (err, data) => {
  let prev = Number.MAX_VALUE;
  let increased = 0;
  for (const row of data.toString().split("\n")) {
    if (+row > prev) increased++;
    prev = +row;
  }
  console.log(increased);
});
