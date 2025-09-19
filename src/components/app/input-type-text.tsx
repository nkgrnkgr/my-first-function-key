"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { useFunctionKeyListener } from "@/hooks/useFunctionKeys";
import { GlobalFunctionKeyView } from "./function-key-view";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  showViewer?: boolean;
};

export function InputTypeText({ ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const { current, last } = useFunctionKeyListener(ref);

  return (
    <div className="relative inline-block">
      <Input ref={ref} type="text" {...props} />
      <GlobalFunctionKeyView
        current={current}
        last={last}
        positionClassName="absolute right-2 top-full mt-1"
      />
    </div>
  );
}
