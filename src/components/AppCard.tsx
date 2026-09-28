import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import theme from "../theme";

type AppCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: keyof typeof theme.spacing;
};

export default function AppCard({
  children,
  style,
  padding = "lg",
}: AppCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          padding: theme.spacing[padding],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,

    borderWidth: 1,
    borderColor: theme.colors.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,

    elevation: 2,
  },
});

