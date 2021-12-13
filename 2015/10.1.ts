let seq = [..."1321131112"];

for (let i = 0; i < 40; i++) {
  const out = [];
  let count = 0;
  for (const [i, elem] of seq.entries()) {
    if (elem === seq[i + 1]) {
      count++;
      continue;
    }
    out.push(`${count + 1}`);
    out.push(elem);
    count = 0;
  }
  seq = out;
}
console.log(seq.length);

export {};
