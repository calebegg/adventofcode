import { readFile } from "fs";

readFile("2015/1.txt", (err, data) => {
  let floor = 0;
  for (const char of data.toString().trim()) {
    if (char === "(") floor++;
    if (char === ")") floor--;
  }
  console.log(floor);
});
