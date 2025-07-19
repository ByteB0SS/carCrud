export function formatDecimalForDB(decimalNumber: number, maxDigits: number, decimalPlaces: number): number | null {
  const maxIntegerDigits = maxDigits - decimalPlaces;

  if (maxIntegerDigits <= 0) return null;

  const parts = decimalNumber.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  if (integerPart.length > maxIntegerDigits) return null;

  const fixed = decimalNumber.toFixed(decimalPlaces);

  const totalDigits = fixed.replace(".", "");
  if (totalDigits.length > maxDigits) return null;

  return parseFloat(fixed);
}
