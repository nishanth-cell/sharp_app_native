import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import theme from "../theme";

type AppIconProps = {
  name: React.ComponentProps<
    typeof MaterialCommunityIcons
  >["name"];

  size?: number;
  color?: string;
};

export default function AppIcon({
  name,
  size = 24,
  color = theme.colors.text,
}: AppIconProps) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
    />
  );
}

