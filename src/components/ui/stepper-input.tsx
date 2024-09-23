import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";

type Props = {
  value: number;
  setValue: (value: number) => void;
};

const StepperInput = ({ value, setValue }: Props) => {
  return (
    <div className="flex border border-neutral-600 rounded">
      <Button variant={"ghost"} onClick={() => setValue(value - 1)}>
        <Minus size={16} />
      </Button>
      <Input
        className="border-none focus-visible:ring-offset-0  focus:ring-offset-0 focus-visible:ring-0 focus:ring-0 w-14"
        type="text"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
      />
      <Button variant={"ghost"} onClick={() => setValue(value + 1)}>
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default StepperInput;
