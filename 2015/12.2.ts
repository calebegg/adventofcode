import { readFile } from "fs";

readFile("2015/12.txt", (err, data) => {
  console.log(sumUp(JSON.parse(data.toString())));
});

function sumUp(j: any): number {
  if (typeof j === "number") return j;
  if (typeof j === "string") return 0;
  if (j instanceof Array) {
    return j.map((o) => sumUp(o)).reduce((x, y) => x + y);
  }
  if (Object.values(j).includes("red")) {
    return 0;
  }
  return Object.values(j)
    .map((o) => sumUp(o))
    .reduce((x, y) => x + y);
}
