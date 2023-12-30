export function randomColor() {
  const r = Number(Math.random() * 256).toFixed(0);
  const g = Number(Math.random() * 256).toFixed(0);
  const b = Number(Math.random() * 256).toFixed(0);
  return `rgb(${r},${g},${b})`;
}
