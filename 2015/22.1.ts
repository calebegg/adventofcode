import {
  combinations,
  combinationsWithReplacement,
  permutations,
} from "combinatorial-generators";

const INPUT = { hp: 55, dmg: 8 };

let minCost = Infinity;

const SPELLS = [
  { name: "Magic Missile", cost: 53 },
  { name: "Drain", cost: 73 },
  { name: "Shield", cost: 113 },
  { name: "Poison", cost: 173 },
  { name: "Recharge", cost: 229 },
] as const;

let minMana = Infinity;
for (let i = 0; i <= 10; i++) {
  for (const combo of combinationsWithReplacement(SPELLS, i)) {
    for (const spells of permutations(combo)) {
      let bossHp = INPUT.hp;

      let playerHp = 50;
      let playerArmor = 0;
      let mana = 500;
      let manaSpent = 0;

      let playerTurn = true;

      let shieldTimer = 0;
      let poisonTimer = 0;
      let rechargeTimer = 0;

      game: while (bossHp > 0 && playerHp > 0) {
        if (shieldTimer > 0) {
          shieldTimer--;
          if (shieldTimer === 0) {
            playerArmor = 0;
          }
        }
        if (poisonTimer > 0) {
          poisonTimer--;
          bossHp -= 3;
        }
        if (rechargeTimer > 0) {
          rechargeTimer--;
          mana += 101;
        }
        if (playerTurn) {
          const spell = spells.shift();
          if (!spell) break;
          mana -= spell.cost;
          if (mana < 0) break;
          manaSpent += spell.cost;
          switch (spell.name) {
            case "Magic Missile":
              bossHp -= 4;
              break;
            case "Drain":
              bossHp -= 2;
              playerHp += 2;
              break;
            case "Shield":
              if (shieldTimer > 0) break game;
              playerArmor = 7;
              shieldTimer = 6;
              break;
            case "Poison":
              if (poisonTimer > 0) break game;
              poisonTimer = 6;
              break;
            case "Recharge":
              if (rechargeTimer > 0) break game;
              rechargeTimer = 5;
              break;
          }
        } else {
          playerHp -= Math.max(INPUT.dmg - playerArmor, 1);
        }
        playerTurn = !playerTurn;
      }
      if (playerHp > 0 && bossHp <= 0) {
        if (manaSpent < minMana) {
          minMana = manaSpent;
        }
      }
    }
  }
}

console.log(minMana);

export {};
