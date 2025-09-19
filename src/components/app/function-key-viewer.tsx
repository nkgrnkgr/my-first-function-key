"use client";

import { useFunctionKeyListener } from "@/hooks/useFunctionKeys";

export function FunctionKeyViewer() {
  const { current, last } = useFunctionKeyListener();

  return (
    <div className="rounded-md bg-black/75 text-white px-3 py-2 font-mono text-sm w-40 h-40">
      <div>
        <strong>Current:</strong> {current ?? "-"}
      </div>
      <div>
        <strong>Last:</strong> {last ?? "-"}
      </div>
    </div>
  );
}
