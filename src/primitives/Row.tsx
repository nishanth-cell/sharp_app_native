import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import theme from "../theme";

type RowProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  gap?: keyof typeof theme.spacing;
  align?: "flex-start" | "center" | "flex-end";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
};

export default function Row({
  children,
  style,
  gap = "sm",
  align = "center",
  justify = "flex-start",
}: RowProps) {
  return (
    <View
      style={[
        styles.row,
        {
          gap: theme.spacing[gap],
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

