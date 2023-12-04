const data = await Deno.readTextFile("2023/4.txt");

const wins = data
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
  .map((winners) => winners.length);

const cards = Array.from(data.split("\n"), () => 1);
for (const [i, winCount] of wins.entries()) {
  for (let j = 1; j <= winCount; j++) {
    cards[i + j] += cards[i];
  }
}

console.log(cards.reduce((acc, cardCount) => acc + cardCount, 0));
