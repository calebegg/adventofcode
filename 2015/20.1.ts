const INPUT = 36000000;

for (let house = 0; ; house++) {
  let amount = 0;
  for (let elf = 1; elf <= house; elf++) {
    if (house % elf == 0) {
      amount += 10 * elf;
    }
  }
  if (amount >= INPUT) {
    console.log(house);
    break;
  }
}

export {};
