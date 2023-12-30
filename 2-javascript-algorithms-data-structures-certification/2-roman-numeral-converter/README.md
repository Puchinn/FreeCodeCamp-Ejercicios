## Roman Numeral Converter

**Exercise :**  
Convert the given number into a roman number.

| Roman numerals | Arabic numerals |
| -------------- | --------------- |
| **M**          | **1000**        |
| **CM**         | **900**         |
| **D**          | **500**         |
| **CD**         | **400**         |
| **C**          | **100**         |
| **XC**         | **90**          |
| **L**          | **50**          |
| **XL**         | **40**          |
| **X**          | **10**          |
| **IX**         | **9**           |
| **V**          | **5**           |
| **IV**         | **4**           |
| **I**          | **1**           |

All roman numerals answers should be provided in upper-case.

### Solution (2022)

```js
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
```

- ✅ `convertToRoman(2)`should return the string `II`
- ✅ `convertToRoman(3)`should return the string `III`
- ✅ `convertToRoman(4)`should return the string `IV`
- ✅ `convertToRoman(5)`should return the string `V`
- ✅ `convertToRoman(9)`should return the string `IX`
- ✅ `convertToRoman(12)` should return the string `XII`
- ✅ `convertToRoman(16)` should return the string `XVI`
- ✅ `convertToRoman(29)` should return the string `XXIX`
- ✅ `convertToRoman(44)` should return the string `XLIV`
- ✅ `convertToRoman(45)` should return the string `XLV`
- ✅ `convertToRoman(68)` should return the string `LXVIII`
- ✅ `convertToRoman(83)` should return the string `LXXXIII`
- ✅ `convertToRoman(97)` should return the string `XCVII`
- ✅ `convertToRoman(99)` should return the string `XCIX`
- ✅ `convertToRoman(400)` should return the string `CD`
- ✅ `convertToRoman(500)` should return the string `D`
- ✅ `convertToRoman(501)` should return the string `DI`
- ✅ `convertToRoman(649)` should return the string `DCXLIX`
- ✅ `convertToRoman(798)` should return the string `DCCXCVIII`
- ✅ `convertToRoman(891)` should return the string `DCCCXCI`
- ✅ `convertToRoman(1000)` should return the string `M`
- ✅ `convertToRoman(1004)` should return the string `MIV`
- ✅ `convertToRoman(1006)` should return the string `MVI`
- ✅ `convertToRoman(1023)` should return the string `MXXIII`
- ✅ `convertToRoman(2014)` should return the string `MMXIV`
- ✅ `convertToRoman(3999)` should return the string `MMMCMXCIX`
