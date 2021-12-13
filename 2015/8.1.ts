import { readFile } from "fs";

readFile("2015/8.txt", (err, data) => {
  let diff = 0;
  for (const l of data.toString().split("\n")) {
    diff += l.length - eval(l).length;
  }
  console.log(diff);
});
