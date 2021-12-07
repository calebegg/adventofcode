import { readFile } from "fs";

readFile("6.txt", (err, data) => {
  let state = data
    .toString()
    .split(",")
    .map((x) => +x);
  const buckets = Array.from({ length: 9 }, () => 0);
  for (const x of state) {
    buckets[x]++;
  }
  for (let i = 0; i < 256; i++) {
    const spawned = buckets.shift()!;
    buckets[8] = spawned;
    buckets[6] += spawned;
  }
  console.log(buckets.reduce((x, y) => x + y));
});
