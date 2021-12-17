const INPUT = { r: 3010, c: 3019 };

let r = 1;
let c = 1;
let val = 20151125;

while (true) {
  val = (val * 252533) % 33554393;
  if (r == 1) {
    r = c + 1;
    c = 1;
  } else {
    r--;
    c++;
  }
  if (r === INPUT.r && c === INPUT.c) break;
}

console.log(val);

export {};
