import { readFile } from "fs";

readFile("2015/23.txt", (err, data) => {
  const program = data
    .toString()
    .split("\n")
    .map((l) => [l.substring(0, 3), l.substring(4).split(", ")] as const);
  let pc = 0;
  const registers = new Map<string, number>([
    ["a", 1],
    ["b", 0],
  ]);
  while (true) {
    if (pc < 0 || pc >= program.length) {
      break;
    }
    const [inst, args] = program[pc];
    switch (inst) {
      case "hlf":
        registers.set(args[0], registers.get(args[0])! / 2);
        pc++;
        break;
      case "tpl":
        registers.set(args[0], registers.get(args[0])! * 3);
        pc++;
        break;
      case "inc":
        registers.set(args[0], registers.get(args[0])! + 1);
        pc++;
        break;
      case "jmp":
        pc += +args[0];
        break;
      case "jie":
        if (registers.get(args[0])! % 2 === 0) pc += +args[1];
        else pc++;
        break;
      case "jio":
        if (registers.get(args[0])! === 1) pc += +args[1];
        else pc++;
        break;
    }
  }
  console.log(registers.get("b"));
});
