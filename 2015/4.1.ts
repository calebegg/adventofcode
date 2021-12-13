import md5 from "md5";

const key = "ckczppom";

let i = 0;
while (true) {
  i++;
  if (md5(`${key}${i}`).startsWith("00000")) {
    console.log(i);
    break;
  }
}
