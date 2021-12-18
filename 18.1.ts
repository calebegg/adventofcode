import { readFile } from "fs";

type SnailfishNumber = [
  a: SnailfishNumber | number,
  b: SnailfishNumber | number
];

readFile("18.txt", (err, data) => {
  const addends = data
    .toString()
    .split("\n")
    .map((l) => JSON.parse(l) as SnailfishNumber);

  let val = addends[0];
  for (const addend of addends.slice(1)) {
    val = [val, addend];
    let changes = false;
    do {
      changes = tryExplode(val);
      if (changes) continue;
      changes = trySplit(val);
    } while (changes);
  }
  console.log(magnitude(val));
});

function tryExplode(val: SnailfishNumber) {
  let addToLeft = (v: number) => {};
  let addToRight: number | undefined = undefined;
  let modified = false;
  function tryExplodeR(val: SnailfishNumber, depth: number) {
    for (let i = 0; i < val.length; i++) {
      if (typeof val[i] === "number") {
        if (addToRight !== undefined) {
          (val[i] as number) += addToRight;
          return true;
        } else {
          addToLeft = (v) => {
            (val[i] as number) += v;
          };
        }
      } else {
        if (depth === 3 && !modified) {
          addToLeft((val[i] as SnailfishNumber)[0] as number);
          addToRight = (val[i] as SnailfishNumber)[1] as number;
          val[i] = 0;
          modified = true;
        } else {
          if (tryExplodeR(val[i] as SnailfishNumber, depth + 1)) return true;
        }
      }
    }
  }
  tryExplodeR(val, 0);
  return modified;
}

function trySplit(val: SnailfishNumber) {
  for (let i = 0; i < val.length; i++) {
    if (typeof val[i] === "number") {
      if (val[i] > 9) {
        val[i] = [
          Math.floor((val[i] as number) / 2),
          Math.ceil((val[i] as number) / 2),
        ];
        return true;
      }
    } else {
      if (trySplit(val[i] as SnailfishNumber)) return true;
    }
  }
  return false;
}

function magnitude(val: SnailfishNumber | number): number {
  if (typeof val === "number") {
    return val;
  } else {
    return 3 * magnitude(val[0]) + 2 * magnitude(val[1]);
  }
}
