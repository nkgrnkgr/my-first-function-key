"use client";

import { useId, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFunctionKeyListener } from "@/hooks/useFunctionKeys";
import { GlobalFunctionKeyView } from "./function-key-view";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  showViewer?: boolean;
};

export function InputTypeText({ label, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const { current, last } = useFunctionKeyListener(ref);
  const inputId = useId();

  return (
    <div className="relative inline-block">
      {label ? (
        <Label htmlFor={inputId} className="mb-1 block">
          {label}
        </Label>
      ) : null}
      <Input id={inputId} ref={ref} type="text" {...props} />
      <GlobalFunctionKeyView
        current={current}
        last={last}
        positionClassName="absolute right-2 top-full mt-1"
      />
    </div>
  );
}
