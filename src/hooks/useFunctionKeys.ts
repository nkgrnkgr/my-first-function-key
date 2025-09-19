"use client";

// biome-ignore assist/source/organizeImports: <explanation>
import { getFunctionKeyFromEvent, type FunctionKey } from "@/lib/functionKeys";
import { useEffect, useRef, useState } from "react";

export type FunctionKeyState = {
  current: FunctionKey | null;
  last: FunctionKey | null;
};

export function useFunctionKeyListener(): FunctionKeyState {
  const [currentKey, setCurrentKey] = useState<FunctionKey | null>(null);
  const [lastKey, setLastKey] = useState<FunctionKey | null>(null);
  const currentRef = useRef<FunctionKey | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const fnKey = getFunctionKeyFromEvent(event);
      if (fnKey) {
        if (currentRef.current !== fnKey) {
          if (currentRef.current) {
            setLastKey(currentRef.current);
          }
          currentRef.current = fnKey;
          setCurrentKey(fnKey);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const fnKey = getFunctionKeyFromEvent(event);
      if (!fnKey) return;
      // Update last to the key that was just released
      setLastKey(fnKey);
      if (currentRef.current === fnKey) {
        currentRef.current = null;
        setCurrentKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });
    window.addEventListener("keyup", handleKeyUp, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { current: currentKey, last: lastKey };
}
