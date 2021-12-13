import { readFile } from "fs";
import { permutations } from "combinatorial-generators";

readFile("2015/14.txt", (err, data) => {
  const stats = new Map<
    string,
    {
      speed: number;
      flyTime: number;
      restTime: number;
      resting: boolean;
      progress: number;
      flightLeft: number;
      restLeft: number;
    }
  >();
  for (const l of data.toString().split("\n")) {
    const [_, reindeer, speed, flyTime, restTime] = l.match(
      /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./
    )!;
    stats.set(reindeer, {
      speed: +speed,
      flyTime: +flyTime,
      restTime: +restTime,
      resting: false,
      progress: 0,
      flightLeft: +flyTime,
      restLeft: 0,
    });
  }

  for (let s = 0; s < 2503; s++) {
    for (const v of stats.values()) {
      if (v.resting) {
        v.restLeft--;
        if (v.restLeft === 0) {
          v.resting = false;
          v.flightLeft = v.flyTime;
        }
      } else {
        v.progress += v.speed;
        v.flightLeft--;
        if (v.flightLeft === 0) {
          v.resting = true;
          v.restLeft = v.restTime;
        }
      }
    }
  }

  console.log(Math.max(...[...stats.values()].map((v) => v.progress)));
});
