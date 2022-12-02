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
        case "X": // Lose = scissors
          return 3 + 0;
        case "Y": // Draw = rock
          return 1 + 3;
        case "Z": // Win = paper
          return 2 + 6;
      }
      break;
    case "B": // Paper
      switch (you) {
        case "X": // Lose = rock
          return 1 + 0;
        case "Y": // Draw = paper
          return 2 + 3;
        case "Z": // Win = scissors
          return 3 + 6;
      }
      break;
    case "C": // Scissors
      switch (you) {
        case "X": // Lose = paper
          return 2 + 0;
        case "Y": // Draw = scissors
          return 3 + 3;
        case "Z": // Win = rock
          return 1 + 6;
      }
  }
  throw new Error("uh oh");
}
