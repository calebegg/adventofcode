import { readFile } from "fs";

readFile("2015/1.txt", (err, data) => {
  let floor = 0;
  for (const [i, char] of [...data.toString().trim()].entries()) {
    if (char === "(") floor++;
    if (char === ")") floor--;
    if (floor === -1) {
      console.log(i + 1);
      break;
    }
  }
});
