import { readFile } from "fs";

readFile("3.txt", (err, data) => {
  const ones: number[] = [];
  const lines = data.toString().split("\n");
  for (const line of lines) {
    for (const [i, char] of [...line].entries()) {
      if (char === "1") {
        ones[i] = (ones[i] ?? 0) + 1;
      }
    }
  }
  let gamma = "";
  let epsilon = "";
  for (const count of ones) {
    if (count > lines.length / 2) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }
  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
});
