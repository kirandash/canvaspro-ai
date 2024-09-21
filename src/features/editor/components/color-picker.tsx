import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "@/features/editor/constants";
import { rgbaObjectToString } from "@/features/editor/utils";

type Props = {
  color: string;
  onChange: (color: string) => void;
};

export const ColorPicker = ({ color, onChange }: Props) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      <ChromePicker
        color={color}
        onChange={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
      />
      <CirclePicker
        color={color}
        onChangeComplete={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
        colors={colors}
      />
    </div>
  );
};
