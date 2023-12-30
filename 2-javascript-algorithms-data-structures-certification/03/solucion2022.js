function rot13(str) {
  let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let palabra = "";
  for (let i = 0; i < str.length; i++) {
    let num = abc.indexOf(str[i]) - 13;
    if (num === -14) {
      palabra += str[i];
      continue;
    }
    if (num < 0) {
      num = 26 + num;
    }
    palabra += abc[num];
  }
  return palabra;
}

rot13("SERR PBQR PNZC");
