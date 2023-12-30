## Comprobador de palíndromos

**Ejercicio :**  
Devuelve `true` si la cadena proporcionada es un palíndromo. De lo contrario, devuelve `false`.

Un palíndromo es una palabra o frase que se escribe de la misma manera hacia adelante y hacia atrás, ignorando la puntuación, mayúsculas, minúsculas y espaciado.

Nota: Tendrás que eliminar todos los caracteres no alfanuméricos (puntuación, espacios y símbolos) y convertir todo en mayúsculas o minúsculas para comprobar si hay palíndromos.

Pasaremos cadenas con formatos variables, como `racecar`, `RaceCar` y `race CAR` entre otros.

También pasaremos cadenas con símbolos especiales, como `2A3*3a2`, `2A3 3a2` y `2_A3*3#A2`.

### Solucion

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

- ✅ `palindrome("eye")` debe devolver un `booleano`.
- ✅ Aprobado:`palindrome("eye")` debe devolver `true`.
- ✅ Aprobado:`palindrome("\_eye")` debe devolver `true`.
- ✅ Aprobado:`palindrome("race car")` debe devolver `true`.
- ✅ Aprobado:`palindrome("not a palindrome")` debe devolver `false`.
- ✅ Aprobado:`palindrome("A man, a plan, a canal. Panama")` debe devolver `true`.
- ✅ Aprobado:`palindrome("never odd or even")` debe devolver `true`.
- ✅ Aprobado:`palindrome("nope")` debe devolver `false`.
- ✅ Aprobado:`palindrome("almostomla")` debe devolver `false`.
- ✅ Aprobado:`palindrome("My age is 0, 0 si ega ym.")` debe devolver `true`.
- ✅ Aprobado:`palindrome("1 eye for of 1 eye.")` debe devolver `false`.
- ✅ Aprobado:`palindrome("0_0 (: /-\ :) 0-0")` debe devolver `true`.
- ✅ Aprobado:`palindrome("five|\_/|four")` debe devolver `false`.

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
