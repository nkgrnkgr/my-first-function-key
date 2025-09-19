"use client";

import { useFunctionKeyListener } from "@/hooks/useFunctionKeys";
import { H3 } from "../typography";
import { GlobalFunctionKeyView } from "./function-key-view";

export function FunctionKeyViewer() {
  const { current, last } = useFunctionKeyListener();

  return (
    <div className="fixed right-3 bottom-3 z-50">
      <H3>Global</H3>
      <GlobalFunctionKeyView current={current} last={last} />
    </div>
  );
}
