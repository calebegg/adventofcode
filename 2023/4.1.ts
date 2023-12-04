const data = await Deno.readTextFile("2023/4.txt");

console.log(
  data
    .split("\n")
    .map((line) => line.split(":")[1].split("|"))
    .map(([winningNumData, yourNumData]) => [
      winningNumData
        .trim()
        .split(/\s+/)
        .map((x) => +x),
      yourNumData
        .trim()
        .split(/\s+/)
        .map((x) => +x),
    ])
    .map(([winningNums, yourNums]) =>
      yourNums.filter((x) => winningNums.includes(x))
    )
    .filter((winners) => winners.length > 0)
    .map((winners) => 2 ** (winners.length - 1))
    .reduce((acc, points) => acc + points, 0)
);
