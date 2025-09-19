import { useEffect, useRef, useState } from "react";
import { type FunctionKey, getFunctionKeyFromEvent } from "@/lib/functionKeys";

export type FunctionKeyState = {
  current: FunctionKey | null;
  last: FunctionKey | null;
};

export function useFunctionKeyListener<T extends HTMLElement>(
  target?: React.RefObject<T | null>,
): FunctionKeyState {
  const [currentKey, setCurrentKey] = useState<FunctionKey | null>(null);
  const [lastKey, setLastKey] = useState<FunctionKey | null>(null);
  const currentRef = useRef<FunctionKey | null>(null);

  useEffect(() => {
    const eventTarget: EventTarget = target?.current ?? window;

    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      const fnKey = getFunctionKeyFromEvent(keyboardEvent);
      if (!fnKey) return;
      if (currentRef.current !== fnKey) {
        if (currentRef.current) setLastKey(currentRef.current);
        currentRef.current = fnKey;
        setCurrentKey(fnKey);
      }
    };

    const handleKeyUp = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      const fnKey = getFunctionKeyFromEvent(keyboardEvent);
      if (!fnKey) return;
      setLastKey(fnKey);
      if (currentRef.current === fnKey) {
        currentRef.current = null;
        setCurrentKey(null);
      }
    };

    eventTarget.addEventListener("keydown", handleKeyDown, {
      passive: true,
    } as AddEventListenerOptions);
    eventTarget.addEventListener("keyup", handleKeyUp, {
      passive: true,
    } as AddEventListenerOptions);
    return () => {
      eventTarget.removeEventListener("keydown", handleKeyDown);
      eventTarget.removeEventListener("keyup", handleKeyUp);
    };
  }, [target?.current]);

  return { current: currentKey, last: lastKey };
}
