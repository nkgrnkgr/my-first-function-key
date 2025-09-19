"use client";

import { useFunctionKeyListener } from "@/hooks/useFunctionKeys";
import { GlobalFunctionKeyView } from "./function-key-view";

export function FunctionKeyViewer() {
  const { current, last } = useFunctionKeyListener();

  return (
    <GlobalFunctionKeyView
      current={current}
      last={last}
      positionClassName="fixed right-3 bottom-3 z-50"
    />
  );
}
