import { readFile } from "fs";

readFile("2022/3.txt", (err, data) => {
  const packs = data.toString().split("\n");
  let sum = 0;
  for (let i = 0; i < packs.length; i += 3) {
    sum += priority(
      [...packs[i]].filter(
        (item) => packs[i + 1].includes(item) && packs[i + 2].includes(item)
      )[0]
    );
  }
  console.log(sum);
});

function priority(item: string) {
  if (item.match(/[a-z]/)) {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else {
    return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
}
