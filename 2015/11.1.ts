let password = "hxbxwxba";

while (true) {
  for (let i = 7; i >= 0; i--) {
    let code = password.charCodeAt(i);
    if (code === "z".charCodeAt(0)) continue;
    code++;
    password = (password.substring(0, i) + String.fromCharCode(code)).padEnd(
      8,
      "a"
    );
    break;
  }
  let hasStraight = false;
  for (let i = 1; i < password.length - 1; i++) {
    const code = password.charCodeAt(i);
    if (
      password.charCodeAt(i - 1) + 1 === code &&
      code === password.charCodeAt(i + 1) - 1
    ) {
      hasStraight = true;
      break;
    }
  }
  if (!hasStraight) continue;
  if (password.match(/[iol]/)) continue;
  if (!password.match(/(.)\1.*(.)\2/)) continue;
  break;
}

console.log(password);

export {};
