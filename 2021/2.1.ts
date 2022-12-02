import { readFile } from "fs";

readFile("2.txt", (err, data) => {
  let horiz = 0;
  let depth = 0;
  const lines = data.toString().split("\n");
  for (const line of lines) {
    const [dir, amtStr] = line.split(" ");
    const amt = +amtStr;
    switch (dir) {
      case "forward":
        horiz += amt;
        break;
      case "up":
        depth -= amt;
        break;
      case "down":
        depth += amt;
        break;
    }
  }
  console.log(horiz * depth);
});
