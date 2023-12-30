function rot13(texto) {
  let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let textoDecifrado = "";
  for (letra of texto) {
    if (abc.includes(letra)) {
      const indice1 = abc.indexOf(letra) + 13 - 26;
      const indice2 = abc.indexOf(letra) + 13;

      textoDecifrado += abc[indice1] || abc[indice2];
    } else {
      textoDecifrado += letra;
    }
  }
  return textoDecifrado;
}

rot13("SERR PBQR PNZC");
