function telephoneCheck(str) {
  let miex = /^1?\s?(\(\d{3}\) ?|(\d{3}))[-\s]?(\d{3})[-\s]?(\d{4})$/;
  return miex.test(str);
}

telephoneCheck("555-555-5555");
