export function formatMoney(value: number): string {
  const valueWithCents = Number(value / 100)
    .toFixed(2)
    .replace('.', ',')

  const valueFormated = valueWithCents.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return valueFormated
}
