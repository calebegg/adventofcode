const data = await Deno.readTextFile("2023/2.txt");

console.log(
  data
    .toString()
    .split("\n")
    .map((l) => l.split(":"))
    .map(
      ([gameName, gameData]) =>
        [
          +gameName.split(" ")[1],
          gameData.split(";").map(
            (game) =>
              new Map(
                game
                  .split(",")
                  .map((p) => p.trim().split(" "))
                  .map(([count, color]) => [color, +count])
              )
          ),
        ] as const
    )
    .filter(
      ([, pulls]) =>
        !pulls.some(
          (pull) =>
            (pull.get("red") ?? 0) > 12 ||
            (pull.get("green") ?? 0) > 13 ||
            (pull.get("blue") ?? 0) > 14
        )
    )
    .map(([id]) => id)
    .reduce((acc, id) => acc + id, 0)
);
