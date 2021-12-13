import { readFile } from "fs";
import { permutations } from "combinatorial-generators";

interface Reindeer {
  speed: number;
  flyTime: number;
  restTime: number;
  resting: boolean;
  progress: number;
  flightLeft: number;
  restLeft: number;
  score: number;
}

readFile("2015/14.txt", (err, data) => {
  const stats = new Map<string, Reindeer>();
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
      score: 0,
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
    let best: Reindeer | null = null;
    let bestScore = -1;
    for (const v of stats.values()) {
      if (v.progress > bestScore) {
        best = v;
        bestScore = v.progress;
      }
    }
    best!.score++;
  }

  console.log(Math.max(...[...stats.values()].map((v) => v.score)));
});
