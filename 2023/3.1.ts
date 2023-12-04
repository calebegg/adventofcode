const data = await Deno.readTextFile("2023/3.txt");

let sum = 0;
const lines = data.split("\n");

for (const [i, l] of lines.entries()) {
  let num = "";
  let isPartNum = false;
  for (const [j, c] of [...l].entries()) {
    if (/\d/.test(c)) {
      num += c;
      isPartNum ||= [
        lines[i - 1]?.[j - 1],
        lines[i - 1]?.[j],
        lines[i - 1]?.[j + 1],
        lines[i][j - 1],
        lines[i][j + 1],
        lines[i + 1]?.[j - 1],
        lines[i + 1]?.[j],
        lines[i + 1]?.[j + 1],
      ].some((adjChar) => adjChar && !/\d/.test(adjChar) && adjChar != ".");
    } else {
      if (isPartNum) sum += +num;
      num = "";
      isPartNum = false;
    }
  }
  if (isPartNum) sum += +num;
}

console.log(sum);
