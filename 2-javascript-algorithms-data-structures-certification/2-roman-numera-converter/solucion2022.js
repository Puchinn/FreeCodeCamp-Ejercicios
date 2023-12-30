function convertToRoman(num) {
  let long = num.toString().length - 1;
  let numString = num.toString();
  const romanos = {
    0: "",
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
  };
  const dec = {
    0: ["I"],
    1: ["X", "L", "XC"],
    2: ["C", "D", "CM"],
    3: ["M"],
  };
  let pruebas = [];
  for (let i = 0; i <= long; i++) {
    let letra = romanos[numString[i]];
    let letra2 = letra.replaceAll("I", dec[long - i][0]);
    if (long - i >= 1 && numString[i] >= 4) {
      letra2 = letra2.replace("V", dec[long - i][1]);
      if (numString[i] == 9) {
        letra2 = dec[long - i][2];
      }
    }
    pruebas.push(letra2);
  }
  return pruebas.join("");
}
convertToRoman(36);
