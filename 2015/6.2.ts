import { readFile } from "fs";

readFile("2015/6.txt", (err, data) => {
  const lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );
  for (const line of data.toString().split("\n")) {
    const [_, x1, y1, x2, y2] = [
      ...line.match(/.* (\d+),(\d+) through (\d+),(\d+)/)!,
    ].map((v) => +v);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        if (line.startsWith("turn on")) {
          lights[x][y]++;
        } else if (line.startsWith("turn off")) {
          lights[x][y]--;
          if (lights[x][y] < 0) lights[x][y] = 0;
        } else {
          lights[x][y] += 2;
        }
      }
    }
  }
  console.log(lights.flat().reduce((x, y) => x + y));
});
