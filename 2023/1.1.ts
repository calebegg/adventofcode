const data = await Deno.readTextFile("2023/1.txt");

console.log(
  data
    .split("\n")
    .map((l) => l.split(""))
    .map(
      (cs) =>
        +(
          cs.find((c) => /\d/.test(c))! + cs.reverse().find((c) => /\d/.test(c))
        )
    )
    .reduce((acc, v) => acc + v, 0)
);
