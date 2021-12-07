import { readFile } from "fs";

readFile("3.txt", (err, data) => {
  const lines = data.toString().split("\n");
  let oxygenCandidates = [...lines];
  let co2Candidates = [...lines];
  let bit = 0;
  while (oxygenCandidates.length > 1) {
    let ones = 0;
    let zeros = 0;
    for (const c of oxygenCandidates) {
      if (c.charAt(bit) === "1") {
        ones++;
      } else {
        zeros++;
      }
    }
    oxygenCandidates = oxygenCandidates.filter(
      (c) => c.charAt(bit) === (ones >= zeros ? "1" : "0")
    );
    bit++;
  }
  bit = 0;
  while (co2Candidates.length > 1) {
    let ones = 0;
    let zeros = 0;
    for (const c of co2Candidates) {
      if (c.charAt(bit) === "1") {
        ones++;
      } else {
        zeros++;
      }
    }
    co2Candidates = co2Candidates.filter(
      (c) => c.charAt(bit) !== (ones >= zeros ? "1" : "0")
    );
    bit++;
  }
  console.log(parseInt(oxygenCandidates[0], 2) * parseInt(co2Candidates[0], 2));
});
