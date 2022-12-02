import { readFile } from "fs";

readFile("4.txt", (err, data) => {
  const blocks = data.toString().split("\n\n");
  const calls = blocks
    .shift()!
    .split(",")
    .map((c) => +c);
  const boards = [];
  for (const block of blocks) {
    boards.push(
      block.split("\n").map((l) =>
        l
          .trim()
          .split(/\s+/)
          .map((n) => +n)
      )
    );
  }
  outer: for (let i = 5; i < calls.length; i++) {
    const soFar = calls.slice(0, i);
    for (const board of boards) {
      if (
        board.some((row) => row.every((n) => soFar.includes(n))) ||
        transpose(board).some((row) => row.every((n) => soFar.includes(n)))
      ) {
        console.log(
          board
            .flat()
            .filter((v) => !soFar.includes(v))
            .reduce((a, b) => a + b) * soFar.at(-1)!
        );
        break outer;
      }
    }
  }
});

function transpose(board: number[][]) {
  return Array.from({ length: 5 }, (_, col) =>
    Array.from({ length: 5 }, (_, row) => board[row][col])
  );
}
