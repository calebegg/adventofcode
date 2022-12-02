import { readFile } from "fs";

readFile("2022/1.txt", (err, data) => {
  const lines = data.toString().split("\n");
  let carried = [];
  let current = 0;
  for (const line of lines) {
    if (line.length === 0) {
      carried.push(current);
      current = 0;
      continue;
    }
    current += +line;
  }
  carried.sort((a, b) => b - a);
  console.log(carried[0] + carried[1] + carried[2]);
});
