function palindrome(palabra) {
  const palabraLowerCase = palabra
    .toLowerCase()
    .match(/[a-z0-9]/gi)
    .join("");
  const palabraReversed = [...palabraLowerCase.split("")].reverse().join("");
  return palabraLowerCase === palabraReversed;
}

palindrome("race CAR"); // true
