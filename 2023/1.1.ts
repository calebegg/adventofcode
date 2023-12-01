import { readFile } from "fs";

readFile("2023/1.txt", (err, data) => {
  const lines = data.toString().split("\n");
  console.log(
    lines
      .map((l) => l.split(""))
      .map(
        (cs) =>
          +(
            cs.find((c) => /\d/.test(c))! +
            cs.reverse().find((c) => /\d/.test(c))
          )
      )
      .reduce((acc, v) => acc + v, 0)
  );
});
