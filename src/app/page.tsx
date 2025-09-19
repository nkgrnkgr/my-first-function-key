import { FunctionKeyViewer, InputTypeText } from "@/components/app";
import { Inline } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Inline gap="lg">
        <InputTypeText label="Input 1" />
        <InputTypeText label="Input 2" />
      </Inline>
      <FunctionKeyViewer />
    </>
  );
}
