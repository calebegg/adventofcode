import { readFile } from "fs";

readFile("2022/4.txt", (err, data) => {
  const pairs = data
    .toString()
    .split("\n")
    .map(
      (l) =>
        l.split(",").map((t) => t.split("-").map((n) => +n)) as [
          [number, number],
          [number, number]
        ]
    );

  console.log(
    pairs.filter(
      ([l, r]) =>
        (l[0] >= r[0] && l[1] <= r[1]) || // l contained within r
        (r[0] >= l[0] && r[1] <= l[1]) || // r contained within l
        (l[0] <= r[0] && l[1] >= r[0]) || // r[0] contained within l
        (l[0] <= r[1] && l[1] >= r[1]) || // r[1] contained within l
        (r[0] <= l[0] && r[1] >= l[0]) || // l[0] contained within r
        (r[0] <= l[1] && r[1] >= l[1]) // l[1] contained within r
    ).length
  );
});
