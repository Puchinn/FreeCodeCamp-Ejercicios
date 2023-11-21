const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

let num1 = "";
let num2 = "";
let operator = "";
let lastResult = "";

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const action = e.target.dataset.action;
    const keyValue = e.target.textContent;

    if (!action && !operator) {
      num1 += keyValue;
      display.textContent = num1;
    }

    if (action) {
      if (action === "decimal") {
        operator ? (num2 = addDecimal(num2)) : (num1 = addDecimal(num1));
        return;
      }
      if (action === "clear") {
        return clear();
      }
      if (action === "calculate") {
        if (lastResult && !num1) {
          num1 = lastResult;
        }
        const result = calculate(num1, operator, num2);
        if (Number.isSafeInteger(result)) {
          display.textContent = result;
          lastResult = result;
        } else {
          display.textContent = result.toFixed(2);
          lastResult = result.toFixed(2);
        }
        num1 = "";
        num2 = "";
        operator = "";
        return;
      }
      operator = action;
    }

    if (!action && operator) {
      num2 += keyValue;
      display.textContent = num2;
    }
  }

  console.log({
    num1,
    num2,
    operator,
    lastResult,
  });
});

function addDecimal(num) {
  if (num.includes(".")) return num;
  return (num += ".");
}

function calculate(num1, operation, num2) {
  const a = Number(num1);
  const b = Number(num2);
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    default:
      return null;
  }
}

function clear() {
  display.textContent = 0;
  num1 = "";
  num2 = "";
  operator = "";
  lastResult = "";
}
