import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";

import theme from "../theme";

type AppTextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  size?: keyof typeof theme.typography.sizes;
  weight?: keyof typeof theme.typography.weights;
  color?: string;
  align?: "left" | "center" | "right";
  numberOfLines?: number;
};

export default function AppText({
  children,
  style,
  size = "md",
  weight = "regular",
  color,
  align = "left",
  numberOfLines,
}: AppTextProps) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        {
          fontSize: theme.typography.sizes[size],
          fontWeight: theme.typography.weights[weight],
          color: color ?? theme.colors.text,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});

