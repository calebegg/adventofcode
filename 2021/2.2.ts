import { readFile } from "fs";

readFile("2.txt", (err, data) => {
  let horiz = 0;
  let depth = 0;
  let aim = 0;
  const lines = data.toString().split("\n");
  for (const line of lines) {
    const [dir, amtStr] = line.split(" ");
    const amt = +amtStr;
    switch (dir) {
      case "forward":
        horiz += amt;
        depth += aim * amt;
        break;
      case "up":
        aim -= amt;
        break;
      case "down":
        aim += amt;
        break;
    }
  }
  console.log(horiz * depth);
});
