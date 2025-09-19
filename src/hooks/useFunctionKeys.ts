"use client";
import { useEffect, useRef, useState } from "react";
import { type FunctionKey, getFunctionKeyFromEvent } from "@/lib/functionKeys";

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

export function useFunctionKeyListenerWithin<T extends HTMLElement>(
  target: React.RefObject<T | null>,
): FunctionKeyState {
  const [currentKey, setCurrentKey] = useState<FunctionKey | null>(null);
  const [lastKey, setLastKey] = useState<FunctionKey | null>(null);
  const currentRef = useRef<FunctionKey | null>(null);

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const fnKey = getFunctionKeyFromEvent(event);
      if (fnKey) {
        if (currentRef.current !== fnKey) {
          if (currentRef.current) setLastKey(currentRef.current);
          currentRef.current = fnKey;
          setCurrentKey(fnKey);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const fnKey = getFunctionKeyFromEvent(event);
      if (!fnKey) return;
      setLastKey(fnKey);
      if (currentRef.current === fnKey) {
        currentRef.current = null;
        setCurrentKey(null);
      }
    };

    element.addEventListener(
      "keydown",
      handleKeyDown as EventListener,
      { passive: true } as AddEventListenerOptions,
    );
    element.addEventListener(
      "keyup",
      handleKeyUp as EventListener,
      { passive: true } as AddEventListenerOptions,
    );
    return () => {
      element.removeEventListener("keydown", handleKeyDown as EventListener);
      element.removeEventListener("keyup", handleKeyUp as EventListener);
    };
  }, [target]);

  return { current: currentKey, last: lastKey };
}
