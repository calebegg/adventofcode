import { readFile } from "fs";

const DIGITS = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

const DIGIT_MATCHER = `(${[...DIGITS.keys()].join("|")}|\\d)`;

const DIGIT_MATCHER_L = new RegExp(`.*?${DIGIT_MATCHER}`);

const DIGIT_MATCHER_R = new RegExp(`.*${DIGIT_MATCHER}`);

readFile("2023/1.txt", (err, data) => {
  const lines = data.toString().split("\n");
  console.log(
    lines
      .map((l) => {
        const first = l.match(DIGIT_MATCHER_L)![1];
        const last = l.match(DIGIT_MATCHER_R)![1];
        return Number(
          (DIGITS.get(first) ?? first) + (DIGITS.get(last) ?? last)
        );
      })
      .reduce((acc, v) => acc + v, 0)
  );
});
