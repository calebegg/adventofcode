const INPUT = 36000000;

for (let house = 0; ; house++) {
  let amount = 11;
  for (let elf = 1; elf <= Math.sqrt(house); elf++) {
    if (house % elf == 0 && house / elf <= 50) {
      amount += 11 * elf;
    }
  }
  if (amount >= INPUT) {
    console.log(house);
    break;
  }
}

export {};
