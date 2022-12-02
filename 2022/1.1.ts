import { readFile } from "fs";

readFile("2022/1.txt", (err, data) => {
  const lines = data.toString().split("\n");
  let most = 0;
  let current = 0;
  for (const line of lines) {
    if (line.length === 0) {
      if (current > most) {
        most = current;
      }
      current = 0;
      continue;
    }
    current += +line;
  }
  console.log(most);
});
