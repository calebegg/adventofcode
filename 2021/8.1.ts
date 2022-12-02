import { readFile } from "fs";

readFile("8.txt", (err, data) => {
  console.log(
    data
      .toString()
      .split("\n")
      .flatMap((l) => l.split("|")[1].trim().split(" "))
      .filter(
        (d) =>
          d.length === 2 || d.length === 3 || d.length === 4 || d.length === 7
      ).length
  );
});
