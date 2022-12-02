import { permutationsWithReplacement } from "combinatorial-generators";

const INPUT = { player1: 8, player2: 10 };

const rolls = new Map<number, number>();
for (const roll of permutationsWithReplacement([1, 2, 3], 3)) {
  const total = roll.reduce((x, y) => x + y);
  rolls.set(total, (rolls.get(total) ?? 0) + 1);
}
const ROLL_COUNTS = [...rolls.entries()].map(([k, v]) => ({
  roll: k,
  universes: v,
}));

function play(positions: number[], scores: number[], turn: number): number[] {
  const wins = [0, 0];
  if (scores[0] >= 21) return [1, 0];
  if (scores[1] >= 21) return [0, 1];
  for (const { roll, universes } of ROLL_COUNTS) {
    const positionsCopy = [...positions];
    const scoresCopy = [...scores];
    for (let i = 0; i < roll; i++) {
      positionsCopy[turn]++;
      if (positionsCopy[turn] === 11) positionsCopy[turn] = 1;
    }
    scoresCopy[turn] += positionsCopy[turn];
    for (const [i, win] of play(
      positionsCopy,
      scoresCopy,
      turn === 1 ? 0 : 1
    ).entries()) {
      wins[i] += win * universes;
    }
  }
  return wins;
}

console.log(Math.max(...play([INPUT.player1, INPUT.player2], [0, 0], 0)));

export {};
