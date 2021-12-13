import { readFile } from "fs";

readFile("2015/3.txt", (err, data) => {
  let x = 0;
  let y = 0;
  let rx = 0;
  let ry = 0;
  let robo = false;
  const visited = new Set(["0,0"]);
  for (const c of data.toString().trim()) {
    if (robo) {
      [rx, ry] = interpret(c, rx, ry);
      visited.add(`${rx},${ry}`);
    } else {
      [x, y] = interpret(c, x, y);
      visited.add(`${x},${y}`);
    }
    robo = !robo;
  }
  console.log(visited.size);
});

function interpret(dir: string, x: number, y: number) {
  switch (dir) {
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
  return [x, y];
}
