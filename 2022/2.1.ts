import { readFile } from "fs";

readFile("2022/2.txt", (err, data) => {
  const rounds = data
    .toString()
    .split("\n")
    .map((p) => p.split(" ") as [string, string]);
  let score = 0;
  for (const round of rounds) {
    score += process(round);
  }
  console.log(score);
});

function process([them, you]: [string, string]) {
  switch (them) {
    case "A": // Rock
      switch (you) {
        case "X": // Rock
          return 1 + 3;
        case "Y": // Paper
          return 2 + 6;
        case "Z": // Scissors
          return 3 + 0;
      }
      break;
    case "B": // Paper
      switch (you) {
        case "X": // Rock
          return 1 + 0;
        case "Y": // Paper
          return 2 + 3;
        case "Z": // Scissors
          return 3 + 6;
      }
      break;
    case "C": // Scissors
      switch (you) {
        case "X": // Rock
          return 1 + 6;
        case "Y": // Paper
          return 2 + 0;
        case "Z": // Scissors
          return 3 + 3;
      }
  }
  throw new Error("uh oh");
}
