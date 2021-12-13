import md5 from "md5";

const key = "ckczppom";

let i = 117946;
while (true) {
  i++;
  if (md5(`${key}${i}`).startsWith("000000")) {
    console.log(i);
    break;
  }
}
