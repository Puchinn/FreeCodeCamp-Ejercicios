## Caesars Cipher

One of the simplest and most widely known _ciphers_ is a _Caesar cipher_, also known as a _shift cipher_. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the **ROT13** cipher, where the values of the letters are shifted by 13 places. Thus `A ↔ N`, `B ↔ O` and so on.

**Exercise :** Write a function which takes a **ROT13** encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

### First solution (2022)

```js
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

rot13("SERR PBQR PNZC"); // FREE CODE CAMP
```

### 2023 Solution

```js
function rot13(text) {
  let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let decodedText = "";

  const ABC_LENGTH = abc.length;
  const ROT13 = 13;

  for (letter of text) {
    if (abc.includes(letter)) {
      const index1 = abc.indexOf(letter) + ROT13 - ABC_LENGTH;
      const index2 = abc.indexOf(letter) + ROT13;

      decodedText += abc[index1] || abc[index2];
    } else {
      decodedText += letter;
    }
  }
  return decodedText;
}

rot13("SERR PBQR PNZC"); // FREE CODE CAMP
```

- ✅ `rot13("SERR PBQR PNZC")` should decoded to the string `FREE CODE CAMP`
- ✅ `rot13("SERR CVMMN!")` should decoded to the string `FREE PIZZA!`
- ✅ `rot13("SERR YBIR?")` should decoded to the string `FREE LOVE?`
- ✅ `rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")` should decoded to the string `THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.`
