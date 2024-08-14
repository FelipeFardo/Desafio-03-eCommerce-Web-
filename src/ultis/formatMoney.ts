export function formatMoney(value: number): string {
  const valueFormated = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return valueFormated
}
