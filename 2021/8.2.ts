import { readFile } from "fs";

readFile("8.txt", (err, input) => {
  const data = input
    .toString()
    .split("\n")
    .map((l) =>
      l
        .split(" | ")
        .map((d) => d.split(" ").map((d) => d.split("").sort().join("")))
    )
    .map(([digits, display]) => ({ digits, display }));

  let output = 0;
  for (const { digits, display } of data) {
    const digitMap: string[] = [];
    digitMap[1] = digits.find((d) => d.length === 2)!;
    digitMap[4] = digits.find((d) => d.length === 4)!;
    digitMap[7] = digits.find((d) => d.length === 3)!;
    digitMap[8] = digits.find((d) => d.length === 7)!;

    digitMap[0] = digits.find(
      (d) => d.length === 6 && subset(digitMap[1], d) && !subset(digitMap[4], d)
    )!;
    digitMap[3] = digits.find((d) => d.length === 5 && subset(digitMap[1], d))!;
    digitMap[6] = digits.find(
      (d) => d.length === 6 && !subset(digitMap[1], d)
    )!;
    digitMap[9] = digits.find(
      (d) => d.length === 6 && subset(digitMap[1], d) && subset(digitMap[4], d)
    )!;

    digitMap[2] = digits.find(
      (d) =>
        d.length === 5 && !subset(digitMap[1], d) && !subset(d, digitMap[6])
    )!;
    digitMap[5] = digits.find(
      (d) => d.length === 5 && !subset(digitMap[1], d) && subset(d, digitMap[6])
    )!;

    let value = 0;
    for (const digit of display) {
      value = value * 10 + digitMap.indexOf(digit);
    }
    output += value;
  }
  console.log(output);
});

function subset(small: string, big: string) {
  return small.split("").every((c) => big.includes(c));
}
