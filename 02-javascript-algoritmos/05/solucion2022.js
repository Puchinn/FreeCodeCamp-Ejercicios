function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  const valores = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };
  let valorTotal = 0;
  let monedas = 0;
  let cantidadMonedas = 0;
  for (let i = 0; i < cid.length; i++) {
    valorTotal += cid[i][1];
    let valorMoneda = valores[cid[i][0]];
    let valorEnCaja = cid[i][1];
    if (change < 1 && valorMoneda <= change) {
      monedas += valorEnCaja;
    }
  }
  if (valorTotal === change) {
    return { status: "CLOSED", change: cid };
  }
  if (monedas < change && change < 1) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  let vuelto = 0;
  let obg = { status: "OPEN", change: [] };
  for (let i = cid.length - 1; i >= 0; i--) {
    let valorMoneda = valores[cid[i][0]];
    let valorEnCaja = cid[i][1];
    cantidadMonedas = Math.round(valorEnCaja / valorMoneda);
    if (valorMoneda < change) {
      let nombre;
      let valor;
      let j = 0;
      while (true) {
        if (vuelto + valorMoneda <= change + 0.005 && cantidadMonedas !== 0) {
          vuelto += valorMoneda;
          cantidadMonedas -= 1;
          nombre = cid[i][0];
          j++;
        } else {
          if (nombre !== undefined) {
            obg.change.push([nombre, valorMoneda * j]);
          }
          j = 0;
          break;
        }
      }
    }
  }
  return obg;
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
