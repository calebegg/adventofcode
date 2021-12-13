import { readFile } from "fs";

readFile("2015/3.txt", (err, data) => {
  let x = 0;
  let y = 0;
  const visited = new Set(["0,0"]);
  for (const c of data.toString().trim()) {
    switch (c) {
      case "^":
        y++;
        break;
      case "v":
        y--;
        break;
      case ">":
        x++;
        break;
      case "<":
        x--;
        break;
    }
    visited.add(`${x},${y}`);
  }
  console.log(visited.size);
});
