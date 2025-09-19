"use client";

import { cn } from "@/lib/utils";

type Props = {
  current: string | null;
  last: string | null;
  positionClassName?: string;
};

export function GlobalFunctionKeyView({
  current,
  last,
  positionClassName,
}: Props) {
  const baseClass =
    "rounded-md bg-black/75 text-white px-2 py-1 font-mono text-xs shadow-xs w-max";
  return (
    <div className={cn(baseClass, positionClassName)}>
      <div>
        <strong>Current:</strong> {current ?? "-"}
      </div>
      <div>
        <strong>Last:</strong> {last ?? "-"}
      </div>
    </div>
  );
}
