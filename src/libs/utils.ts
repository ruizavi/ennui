export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === "undefined";

export const IsNull = (val: unknown): val is null | undefined =>
  isUndefined(val) || val === null;

export function toBool(value: string | boolean | null): boolean {
  if (IsNull(value)) return false;

  if (value === "false" || value === false) return false;

  if (value === "true" || value === true) return true;

  return false;
}
