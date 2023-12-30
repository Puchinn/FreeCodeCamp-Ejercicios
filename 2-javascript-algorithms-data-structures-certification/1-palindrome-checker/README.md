## Palindrome Checker

**Exercise :**  
Return `true` if the given string is a palindrome. Otherwise, return `false`.

A _palindrome_ is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

**Note**: You'll need to remove a**ll non-alphanumeric characters** (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as `racecar`, `RaceCar`, and `race CAR` among others.

We'll also pass strings with special symbols, such as `2A3*3a2`, `2A3 3a2`, and `2_A3*3#A2`.

### My first solution

```js
function palindrome(str1) {
  let str = str1.toLowerCase();
  let miExr = /[a-z0-9]/gi;
  let arrStr = str.match(miExr);
  let mitad = 0;
  let mitad1;
  let mitad2;
  let sumador = 0;
  if (Number.isInteger(arrStr.length / 2)) {
    mitad = arrStr.length / 2;
    mitad1 = arrStr.slice(0, mitad);
    mitad2 = arrStr.slice(mitad);
  } else {
    mitad = Math.round(arrStr.length / 2);
    mitad1 = arrStr.slice(0, mitad);
    mitad2 = arrStr.slice(mitad - 1);
  }
  for (let i = 0; i < mitad; i++) {
    let rest = mitad2.length - 1 - i;
    if (mitad1[i] === mitad2[rest]) {
      sumador++;
    }
  }
  return sumador === mitad ? true : false;
}

palindrome("eye"); // true
```

### 2023 Solution

```js
function palindrome(word) {
  const wordLowerCase = word
    .toLowerCase()
    .match(/[a-z0-9]/gi)
    .join("");
  const wordReversed = [...wordLowerCase.split("")].reverse().join("");
  return wordLowerCase === wordReversed;
}

palindrome("race CAR"); // true
```

- ✅ `palindrome("eye")` should return a `boolean`.
- ✅ `palindrome("eye")` should return `true`.
- ✅ `palindrome("\_eye")` should return `true`.
- ✅ `palindrome("race car")` should return `true`.
- ✅ `palindrome("not a palindrome")` should return `false`.
- ✅ `palindrome("A man, a plan, a canal. Panama")` should return `true`.
- ✅ `palindrome("never odd or even")` should return `true`.
- ✅ `palindrome("nope")` should return `false`.
- ✅ `palindrome("almostomla")` should return `false`.
- ✅ `palindrome("My age is 0, 0 si ega ym.")` should return `true`.
- ✅ `palindrome("1 eye for of 1 eye.")` should return `false`.
- ✅ `palindrome("0_0 (: /-\ :) 0-0")` should return `true`.
- ✅ `palindrome("five|\_/|four")` should return `false`.
