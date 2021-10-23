export function isRecord(val: unknown): val is Record<string, unknown> {
  if (typeof val === 'object' && val != null) {
    return true;
  }

  return false;
}
