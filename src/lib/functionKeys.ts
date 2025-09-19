export const FUNCTION_KEYS = Array.from(
  { length: 24 },
  (_, index) => `F${index + 1}` as const,
);

export type FunctionKey = (typeof FUNCTION_KEYS)[number];

export function isFunctionKeyString(key: string): key is FunctionKey {
  return FUNCTION_KEYS.includes(key as FunctionKey);
}

export function parseFunctionKey(key: string): FunctionKey | null {
  const upper = key.toUpperCase();
  return isFunctionKeyString(upper) ? upper : null;
}

export function getFunctionKeyFromEvent(
  event: KeyboardEvent,
): FunctionKey | null {
  // "F1".."F24" when the Fn modifier is active on keyboards that require it
  return parseFunctionKey(event.key);
}
