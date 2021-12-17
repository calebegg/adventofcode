import { combinations } from "combinatorial-generators";

const INPUT = { hp: 100, dmg: 8, armor: 2 };

let maxCost = -1;

for (const weapon of [
  { cost: 8, dmg: 4, armor: 0 },
  { cost: 10, dmg: 5, armor: 0 },
  { cost: 25, dmg: 6, armor: 0 },
  { cost: 40, dmg: 7, armor: 0 },
  { cost: 74, dmg: 8, armor: 0 },
]) {
  for (const armor of [
    { cost: 0, dmg: 0, armor: 0 },
    { cost: 13, dmg: 0, armor: 1 },
    { cost: 31, dmg: 0, armor: 2 },
    { cost: 53, dmg: 0, armor: 3 },
    { cost: 75, dmg: 0, armor: 4 },
    { cost: 102, dmg: 0, armor: 5 },
  ]) {
    for (const rings of combinations(
      [
        { cost: 0, dmg: 0, armor: 0 },
        { cost: 0, dmg: 0, armor: 0 },
        { cost: 25, dmg: 1, armor: 0 },
        { cost: 50, dmg: 2, armor: 0 },
        { cost: 100, dmg: 3, armor: 0 },
        { cost: 20, dmg: 0, armor: 1 },
        { cost: 40, dmg: 0, armor: 2 },
        { cost: 80, dmg: 0, armor: 3 },
      ],
      2
    )) {
      let bossHp = INPUT.hp;
      const bossDmg = INPUT.dmg;
      const bossArmor = INPUT.armor;

      let playerHp = 100;
      const playerDmg = weapon.dmg + armor.dmg + rings[0].dmg + rings[1].dmg;
      const playerArmor =
        weapon.armor + armor.armor + rings[0].armor + rings[1].armor;

      while (bossHp > 0 && playerHp > 0) {
        bossHp -= Math.max(playerDmg - bossArmor, 1);
        if (bossHp <= 0) break;
        playerHp -= Math.max(bossDmg - playerArmor, 1);
      }
      if (playerHp <= 0 && bossHp > 0) {
        const cost = weapon.cost + armor.cost + rings[0].cost + rings[1].cost;
        if (cost > maxCost) {
          maxCost = cost;
        }
      }
    }
  }
}

console.log(maxCost);

export {};
