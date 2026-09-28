import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import theme from "../theme";

type ColumnProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  gap?: keyof typeof theme.spacing;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
};

export default function Column({
  children,
  style,
  gap = "sm",
  align = "stretch",
}: ColumnProps) {
  return (
    <View
      style={[
        styles.column,
        {
          gap: theme.spacing[gap],
          alignItems: align,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
});

