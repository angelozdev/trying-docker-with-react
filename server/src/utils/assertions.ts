export const __DEV__ = process.env.NODE_ENV === "development";
export const __PROD__ = process.env.NODE_ENV === "production";
export function isNumber(value: any): boolean {
  if (typeof value === "number") return true;
  if (typeof value === "string") return !isNaN(Number(value));
  return false;
}
