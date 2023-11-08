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
