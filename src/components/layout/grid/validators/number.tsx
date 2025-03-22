export default function formatNumber(num: any) {
  const value = num ? parseFloat(num): 0.00
  return value?.toFixed(2);
}
