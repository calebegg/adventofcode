const data = await Deno.readTextFile("2023/2.txt");

console.log(
  data
    .toString()
    .split("\n")
    .map((l) => l.split(":"))
    .map(([, gameData]) =>
      [
        ...gameData
          .split(";")
          .map(
            (game) =>
              new Map(
                game
                  .split(",")
                  .map((pullData) => pullData.trim().split(" "))
                  .map(([count, color]) => [color, +count])
              )
          )
          .reduce((acc, pull) => {
            for (const k of ["red", "green", "blue"]) {
              acc.set(k, Math.max(acc.get(k) ?? 0, pull.get(k) ?? 0));
            }
            return acc;
          }, new Map())
          .values(),
      ].reduce((acc, value) => acc * value, 1)
    )
    .reduce((acc, power) => acc + power, 0)
);
