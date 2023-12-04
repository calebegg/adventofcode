const data = await Deno.readTextFile("2023/3.txt");

let sum = 0;
const lines = data.split("\n");
const potentialGears = new Map<string, number[]>();

for (const [i, l] of lines.entries()) {
  let num = "";
  let asterisk = "";
  const setPotentialGears = () => {
    if (asterisk) {
      potentialGears.set(
        asterisk,
        (potentialGears.get(asterisk) ?? []).concat(+num)
      );
    }
  };
  for (const [j, c] of [...l].entries()) {
    if (/\d/.test(c)) {
      num += c;
      if (!asterisk) {
        const asteriskCoords = [
          [i - 1, j - 1],
          [i - 1, j],
          [i - 1, j + 1],
          [i, j - 1],
          [i, j + 1],
          [i + 1, j - 1],
          [i + 1, j],
          [i + 1, j + 1],
        ].find(([x, y]) => lines[x]?.[y] === "*");
        if (asteriskCoords) {
          asterisk = `${asteriskCoords[0]},${asteriskCoords[1]}`;
        }
      }
    } else {
      setPotentialGears();
      num = "";
      asterisk = "";
    }
  }
  setPotentialGears();
}

for (const v of potentialGears.values()) {
  if (v.length != 2) continue;
  sum += v[0] * v[1];
}

console.log(sum);
