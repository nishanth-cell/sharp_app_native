import React from "react";
import { StyleSheet, View } from "react-native";

import theme from "../theme";

type SpacerProps = {
  size?: keyof typeof theme.spacing;
  horizontal?: boolean;
};

export default function Spacer({
  size = "md",
  horizontal = false,
}: SpacerProps) {
  return (
    <View
      style={
        horizontal
          ? {
              width: theme.spacing[size],
            }
          : {
              height: theme.spacing[size],
            }
      }
    />
  );
}

