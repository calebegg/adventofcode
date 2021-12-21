const INPUT = { player1: 8, player2: 10 };

let numRolls = 0;
let rollValue = 0;
function roll() {
  numRolls++;
  rollValue++;
  if (rollValue === 101) rollValue = 1;
  return rollValue;
}

const scores = [0, 0];
const positions = [INPUT.player1, INPUT.player2];
let turn = 0;

while (scores[0] < 1000 && scores[1] < 1000) {
  let position = positions[turn];
  const add = roll() + roll() + roll();
  for (let i = 0; i < add; i++) {
    position++;
    if (position === 11) position = 1;
  }
  positions[turn] = position;
  scores[turn] += position;
  turn = turn === 0 ? 1 : 0;
}
console.log(Math.min(...scores) * numRolls);

export {};
