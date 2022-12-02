import { readFile } from "fs";

readFile("6.txt", (err, data) => {
  let state = data
    .toString()
    .split(",")
    .map((x) => +x);
  for (let i = 0; i < 80; i++) {
    state = state.map((x) => x - 1);
    state = [...state, ...state.filter((x) => x === -1).map((_) => 8)];
    state = state.map((x) => (x === -1 ? 6 : x));
  }
  console.log(state.length);
});
