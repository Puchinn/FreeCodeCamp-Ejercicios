## Caja registradora

Diseña una función `checkCashRegister()` que acepte el precio de compra como primer argumento (`price`), la cantidad pagada como segundo argumento (`cash`), y el dinero en efectivo que tiene la caja (`cid`) como tercer argumento.

`cid` es un arreglo 2D que enumera las monedas disponibles.

La función `checkCashRegister()` siempre debe devolver un objeto con una clave `status` y una clave `change`.

Devuelve `{status: "INSUFFICIENT_FUNDS", change: []}` si el efectivo en caja es menor que el cambio necesario, o si no puedes devolver el cambio exacto.

Devuelve `{status: "CLOSED", change: [...]}` si el efectivo en caja como valor de la clave change es igual al cambio que se debe entregar.

En cualquier otro caso, devuelve `{status: "OPEN", change: [...]}`, con el cambio a entregar en monedas y billetes, ordenados de mayor a menor, como valor de la clave `change`.

| Unidad Monetaria        | Importe            |
| ----------------------- | ------------------ |
| **Penny**               | $0.01 (PENNY)      |
| **Nickel**              | $0.05 (NICKEL)     |
| **Dime**                | $0.1 (DIME)        |
| **Quarter**             | $0.25 (QUARTER)    |
| **Dollar**              | $1 (ONE)           |
| **Five Dollars**        | $5 (FIVE)          |
| **Ten Dollars**         | $10 (TEN)          |
| **Twenty Dollars**      | $20 (TWENTY)       |
| **One-hundred Dollars** | $100 (ONE HUNDRED) |

A continuación, un ejemplo del efectivo en caja en formato de arreglo:

<pre><code>
[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
</code></pre>

`checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])` debe devolver un objeto.

- ✅ Aprobado:`checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])` debe devolver `{status: "OPEN", change: [["QUARTER", 0.5]]}`.

- ✅ Aprobado:`checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])` debe devolver `{status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}`.

- ✅ Aprobado:`checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])` debe devolver `{status: "INSUFFICIENT_FUNDS", change: []}`.

- ✅ Aprobado:`checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])` debe devolver `{status: "INSUFFICIENT_FUNDS", change: []}`.

- ✅ Aprobado:`checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])` debe devolver `{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}`.
